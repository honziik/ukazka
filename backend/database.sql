create table basicUser(
    id SERIAL primary key,
    title varchar(15),
    firstName varchar(50) not null,
    lastName varchar(50) not null,
    degree varchar(15),
    nationalNumber varchar(11) not null
);

create table userStatus(
    id serial primary key,
    statusName varchar(50) not null
);

create table authUser(
    authUser_id int PRIMARY KEY references basicUser(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    status_id int references userStatus(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    login varchar(50) not null,
    password varchar(64) not null,
	isActive boolean
   
);

create table roles(
    id serial primary key,
    roleName varchar(30)
);

create table roles_AuthUser(
    authUser_id int references authUser(authUser_id) ON UPDATE CASCADE ON DELETE CASCADE,
    roles_id int references roles(id) ON UPDATE CASCADE ON DELETE CASCADE
);



create table class(
    id serial primary key,
    classShortcut varchar(4) not null
);

create table term(
    id serial primary key,
    termName varchar(100) not null,
    dateTo date not null,
	dateFrom date not null
);

create table classEnroll(
    id serial primary key,
    class_id int references class(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    authUser_id int references authUser(authUser_id) ON DELETE RESTRICT ON UPDATE CASCADE, 
    term_id int references term(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

create table examResult(
    id serial primary key, 
    result varchar(100) not null,
    pass boolean not null, 
    resultDate date not null,
    comment varchar(200)
);

create table examType(
    id serial primary key,
    examTypeName varchar(50) not null
);

create table exam(
    id serial primary key,
    title varchar(100) not null,
    examDesc varchar(500) not null,
    examResult_id int references examResult(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    examType_id int references examType(id) ON UPDATE CASCADE ON DELETE RESTRICT, 
	subject varchar(50) not null,
    exam_link text,
	isDone boolean,
    isTaken boolean
);

create table userExamTerm(
    authUser_id int references authUser(authUser_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    exam_id int references exam(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    term_id int references term(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    haveexam boolean
);

create table examHistory(
    id serial primary key,
    exam_id int references exam(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    term_id int references term(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    points int not null,
    comment varchar(250)
);

------Imports------

INSERT INTO basicUser(title, firstName, lastName, degree, nationalNumber)
VALUES ('Mgr.', 'Jan', 'Novak', '' , '100275/5942');
INSERT INTO basicUser(title, firstName, lastName, degree, nationalNumber)
VALUES ('Ing.', 'Daniel', 'Merta', 'Dsc. ' , '100312/5945');
INSERT INTO basicUser(title, firstName, lastName, degree, nationalNumber)
VALUES ('', 'John', 'Doe', '' , '200802/9999');
INSERT INTO basicUser(title, firstName, lastName, degree, nationalNumber)
VALUES ('Ing.', 'Marek', 'Navratil', '' , '020316/5412');

INSERT INTO userStatus
VALUES (1, 'active');
INSERT INTO userStatus
VALUES (0, 'inactive');


INSERT INTO authUser
VALUES (1,1,'j.novak.st@spseiostrava.cz', 'novak', true);
INSERT INTO authUser
VALUES (2,1,'d.merta@spseiostrava.cz', 'merta', true);
INSERT INTO authUser
VALUES (3,1,'j.doe.st@spseiostrava.cz', 'johndoe', true);
INSERT INTO authUser
VALUES (4,1,'m.navratil@spseiostrava.cz', 'navratil', true);

INSERT INTO roles(roleName)
VALUES ('admin'), ('leader'), ('oponent'), ('student');

INSERT INTO roles_AuthUser
VALUES(1,4);
INSERT INTO roles_AuthUser
VALUES(2,2);
INSERT INTO roles_AuthUser
VALUES(3,4);
INSERT INTO roles_AuthUser
VALUES(4,3);


INSERT INTO class(classShortcut)
VALUES ('I4A'), ('I4B'), ('I4C'), ('E4A'), ('E4B');

INSERT INTO term
VALUES
(1,'skolniRok', '2022-04-01', '2021-09-03');

INSERT INTO classEnroll(class_id, authUser_id, term_id)
VALUES(2,1,1);
INSERT INTO classenroll(class_id, authUser_id, term_id) 
VALUES (3,3,1);

INSERT INTO examType(examTypeName)
VALUES ('radny'), ('opakovany');

INSERT INTO examResult
VALUES(1,'24 points - grade: 2', TRUE, '2022-04-25', 'Komentar zadny');

INSERT INTO exam
VALUES(1, 'MatPrace', 'maturitni prace', 1, 1, 'IT', '', FALSE,FALSE);
INSERT INTO exam
VALUES(2, 'MatPrace - nezabrana', 'maturitni prace', 1, 1, 'ELT', '', FALSE,FALSE);


INSERT INTO userExamTerm
VALUES(1,1,1);
INSERT INTO userExamTerm
VALUES(2,1,1);
INSERT INTO userExamTerm
VALUES(4,1,1);
INSERT INTO userexamterm
VALUES(2,2,1,true);
INSERT INTO userexamterm
VALUES(4,2,1);

INSERT INTO examHistory
VALUES(1, 1, 1, 24, 'Komentar');

INSERT INTO basicUser(title, firstName, lastName, degree, nationalNumber)
VALUES ('', 'admin', 'admin', '' , '000000/0000');
INSERT INTO authUser
VALUES (5,1,'admin', 'admin', true);
INSERT INTO roles_AuthUser
VALUES(5,1);