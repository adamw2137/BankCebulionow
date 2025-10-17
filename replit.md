# Bank Cebulionów - System Bankowy

## Opis Projektu
Aplikacja bankowa "Bank Cebulionów" z polskim interfejsem użytkownika. System umożliwia rejestrację użytkowników, logowanie, przeglądanie salda konta oraz zarządzanie kontami przez administratora.

## Funkcjonalności MVP

### Strona Główna (Login)
- Formularz logowania z polami: login i hasło
- Przycisk "Zaloguj" do logowania użytkowników
- Przycisk "Zarejestruj się" przekierowujący do rejestracji
- Przycisk "Logowanie admin" w prawym górnym rogu

### Rejestracja
- Formularz rejestracji z polami:
  - Login
  - Hasło
  - Powtórz hasło (z walidacją zgodności)
- Po udanej rejestracji powrót do strony logowania
- Początkowe saldo konta: 0.00 PLN

### Panel Użytkownika
- Powitanie: "Witaj, [nazwa użytkownika]"
- Wyświetlanie aktualnego stanu konta w PLN
- Informacje o numerze konta, typie i statusie
- Przycisk "Wyloguj się"

### Panel Administratora
- Dostęp tylko dla administratora (login: admin, hasło: admingorka)
- Osobna strona logowania administratora
- Tabela ze wszystkimi kontami użytkowników zawierająca:
  - Login (edytowalny)
  - Hasło (edytowalne)
  - Saldo w PLN (edytowalne)
- Możliwość edycji każdego pola dla każdego użytkownika
- Przyciski "Edytuj", "Zapisz" i "Anuluj" dla każdego wiersza
- Przycisk "Wyloguj się"

## Architektura Techniczna

### Frontend
- **Framework**: React z TypeScript
- **Routing**: Wouter
- **Komponenty UI**: Shadcn/ui + Tailwind CSS
- **Formularze**: React Hook Form z walidacją Zod
- **Zarządzanie stanem**: TanStack Query (React Query)
- **Ikony**: Lucide React

### Backend
- **Framework**: Express.js
- **Sesje**: Express-session
- **Walidacja**: Zod schemas
- **Przechowywanie danych**: In-memory storage (Map)

### Struktura Danych
```typescript
User {
  id: string (UUID)
  username: string (unique)
  password: string
  balance: decimal(10,2) (domyślnie "0.00")
}
```

## API Endpoints

### Autoryzacja
- `POST /api/auth/register` - Rejestracja nowego użytkownika
- `POST /api/auth/login` - Logowanie użytkownika
- `POST /api/auth/admin-login` - Logowanie administratora
- `GET /api/auth/me` - Pobranie danych zalogowanego użytkownika
- `GET /api/auth/check-admin` - Sprawdzenie statusu administratora
- `POST /api/auth/logout` - Wylogowanie

### Zarządzanie (Admin)
- `GET /api/admin/users` - Lista wszystkich użytkowników (tylko admin)
- `PUT /api/admin/users/:id` - Aktualizacja danych użytkownika (tylko admin)

## Dane Dostępowe

### Administrator
- **Login**: admin
- **Hasło**: admingorka

### Użytkownicy
Użytkownicy mogą się samodzielnie rejestrować z dowolnymi danymi logowania.

## Przechowywanie Danych
Wszystkie dane (login, hasło, saldo) są przechowywane w pamięci aplikacji (MemStorage) i są w pełni edytowalne przez administratora w panelu zarządzania. Jest to celowy wybór projektowy umożliwiający łatwą edycję wszystkich pól przez administratora, zgodnie z wymaganiami projektu edukacyjnego.

**Uwaga**: Hasła są przechowywane w formie tekstowej (nie hashowane), aby administrator mógł je przeglądać i edytować w panelu. To rozwiązanie jest odpowiednie dla aplikacji edukacyjnych/demonstracyjnych, ale nie powinno być stosowane w środowisku produkcyjnym.

## Projekt Wizualny

### Paleta Kolorów
- **Primary**: Niebieski (210 100% 45%) - zaufanie i stabilność bankowa
- **Secondary**: Teal (160 70% 45%) - wzrost finansowy
- **Success**: Zielony (140 70% 45%) - dodatnie salda
- **Destructive**: Czerwony (dla panelu admin)

### Typografia
- **Font**: Inter (Google Fonts) - doskonałe wsparcie polskich znaków
- **Rozmiary**: Responsywne, hierarchiczne

### Komponenty
- Gradient tła na stronach logowania
- Karty z cieniami i zaokrąglonymi rogami
- Przyciski z responsywnymi stanami hover/active
- Tabela z edytowalnymi wierszami w panelu admin
- Toast notifications dla komunikatów

## Uruchomienie Projektu

Aplikacja jest już skonfigurowana i uruchomiona. Workflow "Start application" automatycznie:
1. Uruchamia serwer Express na porcie 5000
2. Uruchamia frontend Vite dev server
3. Obsługuje hot reload dla zmian w kodzie

## Testowanie
Aplikacja została przetestowana end-to-end obejmując:
- ✅ Rejestrację nowego użytkownika
- ✅ Logowanie użytkownika
- ✅ Wyświetlanie dashboardu z saldem
- ✅ Wylogowanie użytkownika
- ✅ Logowanie administratora
- ✅ Edycję danych użytkownika (login, hasło, saldo)
- ✅ Wylogowanie administratora

## Język Interfejsu
Cała aplikacja wykorzystuje polski język:
- Wszystkie przyciski, etykiety i komunikaty w języku polskim
- Poprawna obsługa polskich znaków diakrytycznych (ą, ć, ę, ł, ń, ó, ś, ź, ż)
- Komunikaty błędów i powiadomienia w języku polskim

## Status Projektu
✅ **MVP Ukończone** - Wszystkie wymagane funkcjonalności zostały zaimplementowane i przetestowane.
