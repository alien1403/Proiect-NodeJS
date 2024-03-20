# ClinicManager Backend API

Acest proiect reprezintă backend-ul unei aplicații web pentru gestionarea unei clinici medicale. Acest document oferă detalii despre API-ul utilizat pentru gestionarea doctorilor, pacienților și programărilor în cadrul clinicii.

## Instalare și Configurare Inițială

1. **Clonează Repositoriul**: 
```bash
git clone [<url_repositoriu>](https://github.com/alien1403/Proiect-NodeJS.git)"
cd Proiect-NodeJS
```
2. **Instalează Dependințele**: 
```bash
npm install
```
3. **Configurează Baza de Date**: 
   - Pentru SQLite, nu este nevoie să creezi manual o bază de date. Aceasta va fi creată automat când vei rula migrările.
   - Asigură-te că ai SQLite instalat pe sistemul tău.
   - În fișierul `database.js`, verifică că setările de conexiune sunt configurează pentru SQLite, similar cu exemplul de mai jos:
   
     ```javascript
     module.exports = {
       development: {
         dialect: 'sqlite',
         storage: './database.sqlite'
       },
       // Alte setări pentru medii de producție și testare...
     };
     ```

   - Rulează migrările pentru a crea tabelele necesare în baza de date SQLite:
     ```
     npx sequelize-cli db:migrate
     ```

   - Odată ce migrările sunt rulate cu succes, tabelele vor fi create în baza de date SQLite specificată în fișierul de configurare.
4. **Rulează Serverul**: 
```bash
npm start
```
## API Routes

### 1. Doctori

- **GET /api/doctors**: Returnează o listă cu toți doctorii.
- **POST /api/doctors**: Adaugă un nou doctor în sistem.
- **GET /api/doctors/:id**: Returnează detalii despre un doctor specific.
- **PUT /api/doctors/:id**: Actualizează detaliile unui doctor existent.
- **DELETE /api/doctors/:id**: Șterge un doctor din sistem, împreună cu toate programările asociate.

### 2. Pacienți

- **GET /api/patients**: Returnează o listă cu toți pacienții.
- **POST /api/patients**: Adaugă un nou pacient în sistem.
- **GET /api/patients/:id**: Returnează detalii despre un pacient specific.
- **PUT /api/patients/:id**: Actualizează detaliile unui pacient existent.
- **DELETE /api/patients/:id**: Șterge un pacient din sistem, împreună cu toate programările asociate.

### 3. Programări

- **GET /api/appointments**: Returnează o listă cu toate programările.
- **POST /api/appointments**: Programă o nouă consultație între un doctor și un pacient.
- **GET /api/appointments/:id**: Returnează detalii despre o programare specifică.
- **PUT /api/appointments/:id**: Actualizează detaliile unei programări existente.
- **DELETE /api/appointments/:id**: Șterge o programare din sistem.
  
### 4. Înregistrare (Signup)
- Endpoint-ul **/signup** permite utilizatorilor să creeze un cont nou în sistem.
- Utilizatorii trimit un request POST către acest endpoint furnizând informațiile necesare pentru a crea un cont, cum ar fi numele, adresa de email, parola etc.
- Serverul primește aceste date și le validează folosind un schema specific. Schema specifică asigură că datele trimise sunt valide și respectă anumite criterii, cum ar fi lungimea minimă a parolei, validitatea adresei de email etc.
- După validare, serverul criptează parola utilizatorului înainte de a o stoca în baza de date. 
- Acest lucru este crucial pentru securitate, deoarece asigură că parolele utilizatorilor sunt păstrate în siguranță, chiar și în cazul unei breșe de securitate.
- Informațiile utilizatorului sunt apoi salvate în baza de date, creând un nou rând în tabela corespunzătoare (Doctor sau Patient, în funcție de tipul utilizatorului).
- După ce contul a fost creat cu succes, serverul generează un token JWT (JSON Web Token) și îl returnează către client. Acest token va fi folosit pentru autentificarea ulterioară a utilizatorului.
### 5. Autentificare (Signin)
- Endpoint-ul **/signin** permite utilizatorilor să se autentifice în sistem folosind un cont existent.
- Utilizatorii trimit un request POST către acest endpoint furnizând adresa lor de email și parola.
- Serverul primește aceste date și le validează folosind un alt schema specific, pentru a se asigura că sunt furnizate toate informațiile necesare și că sunt valide.
- După validare, serverul caută în baza de date un utilizator cu adresa de email furnizată. Dacă utilizatorul există, serverul compară parola furnizată cu parola stocată în baza de date.
- Pentru a verifica parola, serverul folosește funcția bcrypt.compare() pentru a compara parola furnizată cu parola criptată stocată în baza de date. Dacă parolele se potrivesc, utilizatorul este autentificat cu succes și un token JWT este generat și returnat către client.
- Clientul poate folosi acest token pentru a accesa rutele protejate ale aplicației, confirmând identitatea și autentificarea utilizatorului.
  
## Dependințe
- Node.js
- Express.js
- Sequelize (pentru interacțiunea cu baza de date)
- Bcrypt.js (pentru hashingul parolelor)
- JSON Web Token (JWT) (pentru autentificarea utilizatorilor)

## Fluxuri de utilizare
### 1. Programarea unei consultatii
1. **Crearea Contului de pacient**:
   - Accesați endpoint-ul **/signup** și furnizați informațiile necesare, cum ar fi numele, adresa de email și parola.
   - Validarea informațiilor furnizate de server și crearea unui cont în sistem.
  
2. **Autentificare Utilizator**:
   - Accesați endpoint-ul **/signin** și furnizați adresa de email și parola pentru a vă autentifica în sistem.
   - Obțineți un token JWT care va fi folosit pentru autentificare în alte request-uri.

3. **Obținerea Listei de Doctori**:

    - Accesați endpoint-ul **/api/doctors** pentru a obține lista de doctori disponibili 
  
4. **Selectarea Doctorului și Orarului**:

    - Selectați un doctor și o ora pentru consultație.

5. **Crearea Programării**:
    - Trimiteți un request POST către endpoint-ul **/api/appointments**, furnizând detalii despre programare, cum ar fi data și ora, doctorul selectat.   
  
6. **Confirmarea Programării**:
   - Serverul validează informațiile primite și salvează programarea în baza de date.
    - Returnează un răspuns către client pentru a confirma crearea cu succes a programării.
## Contact

Pentru întrebări sau feedback, mă poți contacta prin [email](mailto:hanghicelrazvanmihai@gmail.com) sau [LinkedIn](https://www.linkedin.com/in/razvanmihaihanghicel/).