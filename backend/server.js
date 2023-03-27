const { json } = require("express");
const express = require("express");
const app = express();
const pool = require("./dbHandle");
const serverPort = 5500;

app.use(express.json());

app.get("/homeExams", async (req, res) => {
  const text = `
  SELECT e.*, a.login, r.roles_id,t.id as term_id
  FROM
    exam e
    LEFT JOIN userexamterm uet ON uet.exam_id = e.id
    LEFT JOIN authUser a ON a.authuser_id = uet.authuser_id
    LEFT JOIN roles_authuser r ON r.authuser_id = a.authuser_id
    LEFT JOIN basicUser u ON u.id = a.authuser_id
	LEFT JOIN term t on uet.term_id = t.id
  WHERE isTaken = false and r.roles_id = 2;
`;
  try {
    const result = await pool.query(text);
    console.log(result);
    res.json(result.rows);
  } catch (e) {
    console.error(e.message);
  }
});
app.post("/homeexams/:id", async (req, res) => {
  try {
    const { examId, termId } = req.body;
    const { id } = req.params;
    console.log(req.params, req.body);
    const examUpdate = await pool.query(
      `
      update exam
      set istaken = true
      where id = $1;`,
      [examId]
    );
    const uetInsert = await pool.query(
      `      
    insert into userexamterm
    (authuser_id,exam_id,term_id,haveexam)
    values($1, $2, $3, true); `,
      [id, examId, termId]
    );
    res.json(uetInsert.rows[0]);
    res.json(examUpdate.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});
app.get("/selectUsers", async (req, res) => {
  const text = `
  select a.login,a.authuser_id,r.roles_id
  from authUser a LEFT JOIN roles_authuser r ON r.authuser_id = a.authuser_id;
`;
  try {
    const result = await pool.query(text);
    console.log(result);
    res.json(result.rows);
  } catch (e) {
    console.error(e.message);
  }
});
app.get("/selectYear", async (req, res) => {
  const text = `
  select id,dateto,datefrom
  from term;
`;
  try {
    const result = await pool.query(text);
    console.log(result);
    res.json(result.rows);
  } catch (e) {
    console.error(e.message);
  }
});

app.get("/exams", async (req, res) => {
  const query = `
  SELECT exam.*,examtype.examtypename, (
		SELECT 
			json_build_object(
				'studentname', basicuser.firstname || ' ' || basicuser.lastname, 'class', class.*, 'status', userstatus.statusname, 'studentinfo', basicuser.* 
			)
		FROM authuser
			JOIN roles_authuser ON roles_authuser.authuser_id = authuser.authuser_id
			JOIN basicUser ON basicUser.id = authuser.authuser_id
			LEFT JOIN classenroll ON classenroll.authuser_id = authuser.authuser_id
			JOIN userstatus ON userstatus.id = authuser.status_id
			JOIN userexamterm side ON side.authuser_id = authuser.authuser_id AND side.exam_id = exam.id
			left JOIN class ON class.id = classenroll.class_id 
		WHERE
			roles_authuser.roles_id = 4 AND
			authuser.authuser_id = any(array_agg(fst.authuser_id))
      LIMIT 1
	) as student,(
		SELECT json_build_object('leader', basicuser.*, 'leadername', basicuser.title || ' ' 
								 || basicuser.firstname || ' ' || basicuser.lastname || ' ' || basicuser.degree)
		FROM authuser
			JOIN roles_authuser ON roles_authuser.authuser_id = authuser.authuser_id
		JOIN basicUser ON basicUser.id = authuser.authuser_id
		JOIN userexamterm side ON side.authuser_id = authuser.authuser_id AND side.exam_id = exam.id
		WHERE
			roles_authuser.roles_id = 2 and
			authuser.authuser_id = ANY(array_agg(fst.authuser_id))
      LIMIT 1
	) as leader,(
		SELECT json_build_object('oponent', basicuser.*, 'oponentname', basicuser.title || ' ' 
								 || basicuser.firstname || ' ' || basicuser.lastname || ' ' || basicuser.degree)
		FROM authuser
			JOIN roles_authuser ON roles_authuser.authuser_id = authuser.authuser_id
			JOIN basicUser ON basicUser.id = authuser.authuser_id
			JOIN userexamterm side ON side.authuser_id = authuser.authuser_id AND side.exam_id = exam.id
		WHERE
			roles_authuser.roles_id = 3 and
			authuser.authuser_id = ANY(array_agg(fst.authuser_id))
      LIMIT 1
	) as oponent
FROM exam
	JOIN userexamterm fst ON fst.exam_id = exam.id
	JOIN examtype ON examtype.id = exam.examtype_id
WHERE exam.istaken = true
GROUP BY exam.id,examtype.examtypename
`;
  const studentsQuery = `
  SELECT basicuser.id, CONCAT(basicuser.firstname,' ',basicuser.lastname) as fullname
  FROM authuser
  JOIN roles_authuser ON authuser.authuser_id = roles_authuser.authuser_id
  JOIN basicuser ON basicuser.id = authuser.authuser_id
  WHERE roles_id = 4
  `;
  const teachersQuery = `
  SELECT basicuser.id, CONCAT(basicuser.firstname,' ',basicuser.lastname) as fullname
  FROM authuser
  JOIN roles_authuser ON authuser.authuser_id = roles_authuser.authuser_id
  JOIN basicuser ON basicuser.id = authuser.authuser_id
  WHERE roles_id = 2 OR roles_id = 3
  `;
  const examTypeQuery = `
  SELECT *
  FROM examtype
  `;
  const classesQuery = `
  SELECT *
  FROM class
  `;
  try {
    const result = await pool.query(query);
    const studentQuery = await pool.query(studentsQuery);
    const teacherQuery = await pool.query(teachersQuery);
    const examType = await pool.query(examTypeQuery);
    const classQuery = await pool.query(classesQuery);
    res.json({
      exams: result.rows,
      students: studentQuery.rows,
      teachers: teacherQuery.rows,
      types: examType.rows,
      classes: classQuery.rows,
    });
  } catch (e) {
    console.error(e.message);
  }
});

app.post("/editExam", async (req, res) => {
  try {
    const {
      examId,
      examTitle,
      examDesc,
      examSubject,
      examLink,
      examStudentId,
      examLeaderId,
      examOponentId,
      examOldStudentId,
      examOldLeaderId,
      examOldOponentId,
      studentClassId,
      examTypeId,
    } = req.body;
    //console.log(req.body);
    const editExam = await pool.query(
      `UPDATE exam SET title = '${examTitle}', examdesc = '${examDesc}', subject = '${examSubject}', exam_link = '${examLink}', examtype_id = ${examTypeId} WHERE id = ${examId};`
    );
    const editStudent = await pool.query(
      `
      UPDATE userexamterm SET authuser_id = ${examStudentId} WHERE authuser_id = ${examOldStudentId} AND exam_id = ${examId};
    `
    );
    const editLeader = await pool.query(
      `UPDATE userexamterm SET authuser_id = ${examLeaderId} WHERE authuser_id = ${examOldLeaderId} AND exam_id = ${examId};`
    );
    const editOponent = await pool.query(
      `UPDATE userexamterm SET authuser_id = ${examOponentId} WHERE authuser_id = ${examOldOponentId} AND exam_id = ${examId};`
    );
    const editStudentClass = await pool.query(
      `UPDATE classenroll SET class_id = ${studentClassId} WHERE authuser_id = ${examStudentId};`
    );
    res.json(editStudent.rows[0]);
    res.json(editLeader.rows[0]);
    res.json(editOponent.rows[0]);
    res.json(editStudentClass.rows[0]);
    res.json(editExam.rows[0]);
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/exams/delete", async (req, res) => {
  try {
    console.log(req.body);
    const { exam_id } = req.body;
    const deleteUserExamTerm = await pool.query(`
      DELETE
        FROM userexamterm
        WHERE exam_id = ${exam_id}
    `);
    const deleteExamHistory = await pool.query(`
      DELETE
        FROM examhistory
        WHERE exam_id = ${exam_id}
    `);
    const deleteExam = await pool.query(`
      DELETE
        FROM exam
        WHERE id = ${exam_id}
    `);
    res.json(deleteUserExamTerm.rows);
    res.json(deleteExamHistory.rows);
    res.json(deleteExam.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/login", async (req, res) => {
  const text = `
  SELECT a.authUser_id, a.login, a.password, r.roles_id, uet.haveExam, bu.firstname, bu.lastname
  FROM authUser a LEFT JOIN roles_authuser r ON r.authuser_id = a.authuser_id
  LEFT JOIN userexamterm uet ON a.authuser_id = uet.authuser_id
  JOIN basicuser bu ON bu.id = a.authuser_id
  GROUP BY a.authuser_id, r.roles_id, uet.haveExam, bu.firstname, bu.lastname
  ;
`;
  try {
    const result = await pool.query(text);
    console.log(result);
    res.json(result.rows);
  } catch (e) {
    console.error(e.message);
  }
});

app.get("/users", async (req, res) => {
  const text = `
  SELECT a.login, ra.roles_id, a.status_id, a.isActive, c.classShortcut, ce.term_id, 
	  CONCAT(date_part('year', t.dateFrom), '/' ,date_part('year', t.dateTo)) as schoolYear,	
	  CONCAT(b.title, ' ', b.firstName, ' ', b.lastName, ' ', b.degree) as fullname, uet.haveexam,
    a.authuser_id, a.password, b.title, b.degree, b.firstname, b.lastname, t.dateFrom, t.dateTo
  FROM
    authUser a
    LEFT JOIN roles_authUser ra ON ra.authuser_id = a.authuser_id
    LEFT JOIN classEnroll ce ON ce.authuser_id = a.authuser_id
    LEFT JOIN class c ON c.id = ce.class_id
	  LEFT JOIN term t ON t.id = ce.term_id
	  LEFT JOIN basicuser b ON b.id = a.authuser_id
	  LEFT JOIN userexamterm uet ON a.authuser_id = uet.authuser_id
  WHERE roles_id = 4; 
`;
  try {
    const result = await pool.query(text);
    console.log(result);
    res.json(result.rows);
  } catch (e) {
    console.error(e.message);
  }
});

app.listen(serverPort, () => {
  console.info(`Server running on port ${serverPort}`);
});

app.post("/term", async (req, res) => {
  try {
    const { name, toDate, fromDate } = req.body;
    const newTerm = await pool.query(
      `INSERT INTO term(termname,dateTo, dateFrom)
        VALUES
        ($1,$2,$3)
        RETURNING *`,
      [name, toDate, fromDate]
    );
    res.json(newTerm.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});
app.post("/password/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const updatePassword = await pool.query(
      `
        UPDATE authUser
        SET password = $1
        WHERE authuser_id = $2
        RETURNING *`,
      [password, id]
    );
    res.json(updatePassword.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/imports/examAdd", async (req, res) => {
  try {
    const { title, description, discipline, stud, teac, opon, taken } =
      req.body;
    const text = `
    WITH ins1 AS (
      INSERT INTO exam(title, examdesc,examtype_id, subject,isdone,istaken)
      VALUES ($1,$2, 1, $3 , false,$7)
      RETURNING id AS exams_id
    )
    INSERT INTO userexamterm(authuser_id,exam_id,term_id,haveexam)
    VALUES ($4 ,(SELECT exams_id FROM ins1),1, true),
    ($5 ,(SELECT exams_id FROM ins1),1, true),
    ($6 ,(SELECT exams_id FROM ins1),1, true);
      `;

    const insertStudent = await pool.query(text, [
      title,
      description,
      discipline,
      stud,
      teac,
      opon,
      taken,
    ]);
    res.json(insertStudent.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/imports/teacherAdd", async (req, res) => {
  try {
    const { email, password, firstname, lastname, number, degree, title } =
      req.body;
    const text = `
    WITH ins1 AS (
      INSERT INTO basicUser(title, firstName, lastName, degree, nationalNumber)
      VALUES ($7,$3, $4, $6 , $5)
      RETURNING id AS basic_id
    ),
    new_auth_users as (
      INSERT INTO authUser(authuser_id ,status_id ,login, password, isactive)
      VALUES (
        (SELECT basic_id FROM ins1)
        ,1, $1, $2, true)
      RETURNING authuser_id
    )
    INSERT INTO roles_AuthUser(authuser_id,roles_id)
    VALUES (
      (SELECT authuser_id FROM new_auth_users)
      ,2),(
      (SELECT authuser_id FROM new_auth_users)
      ,3);
      `;
    const insertStudent = await pool.query(text, [
      email,
      password,
      firstname,
      lastname,
      number,
      degree,
      title,
    ]);
    res.json(insertStudent.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/imports/studentAdd", async (req, res) => {
  try {
    const { email, password, firstname, lastname, number, trida, rok } =
      req.body;
    const text = `
    WITH ins1 AS (
      INSERT INTO basicUser(title, firstName, lastName, degree, nationalNumber)
      VALUES ('',$3, $4, '' , $5)
      RETURNING id AS basic_id
    ),
    new_auth_users as (
      INSERT INTO authUser(authuser_id ,status_id ,login, password, isactive)
      VALUES (
        (SELECT basic_id FROM ins1)
        ,1, $1, $2, true)
      RETURNING authuser_id
    ),
    auth_user2 as(
    INSERT INTO roles_AuthUser(authuser_id,roles_id)
    VALUES (
      (SELECT authuser_id FROM new_auth_users)
      ,4)
      RETURNING authuser_id
    )
    INSERT INTO classenroll(class_id,authuser_id,term_id)
    VALUES ($6,
      (SELECT authuser_id FROM auth_user2)
      ,$7);
      `;
    const insertStudent = await pool.query(text, [
      email,
      password,
      firstname,
      lastname,
      number,
      trida,
      rok,
    ]);
    res.json(insertStudent.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/edit", async (req, res) => {
  try {
    const body = ({
      editid,
      email,
      pass,
      checked,
      title,
      fname,
      lname,
      degree,
      classShortcut,
      dateFrom,
      dateTo,
      termid,
    } = req.body);
    console.log(degree);
    const authUser = await pool.query(
      `
      UPDATE authUser
        SET login = $2,
        password = $3,
        isactive = $4
      WHERE authuser_id = $1;`,
      [editid, email, pass, checked]
    );
    const basicUser = await pool.query(
      `UPDATE basicuser
      SET title = $1,
      firstname = $2,
      lastname = $3,
      degree = $4
    WHERE id = $5;`,
      [title, fname, lname, degree, editid]
    );
    const classUser = await pool.query(
      ` UPDATE classEnroll
      SET class_id = c.id
      FROM class c
    WHERE c.classShortcut = $1 AND authuser_id = $2;`,
      [classShortcut, editid]
    );
    const termUser = await pool.query(
      ` UPDATE term
      SET dateFrom = $1,
          dateTo = $2
    WHERE id = $3;`,
      [dateFrom, dateTo, termid]
    );
    res.json(authUser.rows[0]);
    res.json(basicUser.rows[0]);
    res.json(classUser.rows[0]);
    res.json(termUser.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//Run me with `npm run dev command`
