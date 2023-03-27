# Správa maturitních prací
## Cíl maturitní práce
- Cílem práce je navrhnout a vytvořit část, popř. celou webovou aplikaci, která bude cílově využívaná školou pro správu maturitních prací.
- Aplikace musí být navržena a vytvořena s důrazem na její produkční provozovatelnost a další rozšiřitelnost v budoucích letech včetně odpovídající technické a uživatelské dokumentace.

## Problémová oblast
Žáci 4. ročníků dělají jednu maturitní zkoušku formou maturitní práce s obhajobou (některá zaměření si mají možnost vybrat místo toho můžou dělat praktickou maturitní zkoušku).

Současný stav je takový, že učitelé, případně odborníci z praxe (partneři školy), vypisují témata maturitních prací (zapisují je do sdílené tabulky, kterou průběžně vedoucí maturitních komisí kontrolují s ohledem na dostatečné množství vypsaných témat). Následně se témata zveřejňují na www stránkách školy (sdílená tabulka se trochu poupraví – vyexportuje do pdf). Studenti pak mají nějakou dobu na výběr práce a na podání přihlášky k maturitní prací (přihlášku si stahuji jako soubor z www stránek školy, vyplní ji, vytisknou a nechají podepsat vedoucímu práce, následně odevzdají třídnímu učiteli. V případě, že si vyberou možnost dělat praktickou maturitní zkoušku, podávají přihlášku k praktické maturitní zkoušce)

Třídní učitelé následně provedou kontrolu, jestli všichni žáci z třídy mají vybrané a zapsané téma, v případě že někomu téma chybí, musí následně losovat ze zbylých témat.

Učitelé (vedoucí prací) následně vypracovávají zadání práce (stáhnou si šablonu souboru, musí vyplnit údaje o studentovi, tématu, …). Zadání se následně schvalují v předmětových komisích a taky vedením školy. Pak se tisknou a předávají jednotlivým studentům.

V průběhu vypracovávání maturitní práce je každý student povinen splnit dva kontrolní termíny (vedoucí práce o tom sepisuje zápis – stáhne si soubor napíše průběžné hodnocení, informuje o tom studentu, ten to stvrzuje podpisem).

Po zpracování práce odevzdávají práci – ještě loni to muselo být na nosiči CD, poslední rok už jenom elektronicky nahrávali na google disk. Odevzdávají se zdrojové kódy aplikace, programu včetně odpovídající písemná dokumentace.

Mezitím je ke každé práci určen oponent práce (zapíše se to do sdílené tabulky).

Po odevzdaní práce vedoucí práce a oponent vypracovávají hodnocení práce (přidělují se body dle kritérií) a při následně obhajobě (také přidělují body dle kritérií) se po sečtení všech bodů určí výsledné hodnocení (teď to máme tak, že vedoucí práce si stáhne šablonu hodnocení – excelovská tabulka a do ní se zapisují body dle kritérií).

Navržená a vytvořená webová aplikace by měla práci, alespoň některé z těchto činností ulehčit.

Webová aplikace umožní
- přihlášení žáků (nejlépe pomocí Google účtu)
- vedoucím prací
  - možnost zadávat témata maturitních prací,
  - možnost přiřadit konkrétního studenta k tématu,
  - možnost vypracovat zadání k jednotlivým pracím
  - možnost vypracovat hodnoceni u kontrolních termínů
  - umožní přístup k „svým“ pracím
  - možnost zapisovat hodnocení (jak body, tak slovní hodnocení) a vytisknout hodnocení
  - možná možnost nějaké komunikace se „svými“ žáky
- oponentům prací
  - umožní přístup ke „svým“ pracím
  - možnost zapisovat hodnocení (jak body, tak slovní hodnocení) a umožní vytisknout hodnocení
- žákům 4. ročníků
  - vybírat si a přihlašovat se k nabízeným tématům (každý žák jedno téma)
  - umožní přístup ke „svému“ zadání
  - umožní potvrzovat seznámení se jak s průběžným, tak závěrečným hodnocením
  - možnost nahrávaní zdrojových kódu práce a dokumentace
  - možná možnost nějaké komunikace s vedoucím práce
- třídním učitelům
  - umožní prohlížení údajů své třídy
- administrátorovi aplikace
  - správu žáků (asi import žáku 4. ročníků)
  - umožní přidělování oponentů k jednotlivým pracím
  - umožní vytvářet seznamy maturitních prací podle tříd, …
  - umožní vyhledávat žáky, práce, …
  - umožní změnu připravených šablon pro vypracování zadání, pro průběžné hodnocení, pro závěrečné hodnocení
  - umožní změnu v přidělování bodu a úpravy kritérií
 

## Technologie
Aplikace bude postavená na technologické základu node.js (BE), React (FE) a PostreSQL.
## Postup
Projekt bude rozdělen do 3 základních fází.
- Fáze analýzy
- Fáze návrhu řešení
- Fáze implementace
## Fáze analýzy (cca 3 týdny)
V rámci fázi analýzy budou identifikovány hlavní případy užití, bude popsán datový model cílové aplikace a popsány práva hlavních uživatelů aplikace. Cílem fáze analýzy bude zejména definovat očekávaný rozsah cílové aplikace a bude stanoven očekávaný rozsah pro tuto maturitní práci.
## Fáze návrhu řešení (cca 2 týdny)
V rámci fáze návrhu řešení bude připraveno aplikační schéma aplikace – definice architektury, identifikace základních modulů aplikace, na kterých pak bude možné samostatně pracovat.
## Fáze implementace (cca 16 týdnů)
Na základě definované architektury a funkčního rozsahu aplikace budou stanoveny priority pro vlastní implementaci aplikace. Ve fázi implementace bude realizováno vlastní kódování, testování a příprava dokumentace uvažované části.