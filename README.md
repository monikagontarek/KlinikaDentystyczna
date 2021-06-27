# KlinikaDentystyczna

#Zaimportowanie danych do bazy danych MySQL
Wymaga: phpMyAdmin i uruchomienej instancji MySQL

`1. Przejść na strone http://localhost/phpmyadmin/index.php?route=/server/import `

`2. Wybrać plik dental-clinic-backend/import_baza_danych/id16963265_denti.sql`

`3. Kliknąc Wykonaj, baza danych powinna zostać zaimportowana`

`4. Skonfigurować użytkownika u: root hasło: root do bazy danych`



#Uruchomienie dental-clinic-backend
Wymaga: php i zaladowanej biblioteki extension=mysqli

`1. W aktualnym katalogu uruchomic komende `

`php  -S 127.0.0.1:8080 -t dental-clinic-backend/`


#Uruchomienie dental-clinic-ui
Wymaga: nodejs, npm

`1. Przejść do katalogu dental-clinic-ui`

`2. npm install`

`3. npm start`


#Korzystanie z aplikacji

`1. Dwukrotnie kliknac na plik index.html`

`2. Przejść do zakladki Panel Klienta`

`3. Zalogować się za pomocą użytkownika user@gmail.com / 123456 lub na panel admina: admin@admin.pl admin`