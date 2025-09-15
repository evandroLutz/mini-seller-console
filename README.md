# Mini Seller Console

**A lightweight React console to triage Leads and convert them into Opportunities.**

![React](https://img.shields.io/badge/React-18-blue) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3-blue)

---

## Table of Contents

1. [Description](#description)
2. [Features](#features)
3. [Installation](#installation)
4. [Project Structure](#project-structure)
5. [Main Components](#main-components)
6. [Hooks & Contexts](#hooks--contexts)
7. [How to Run](#how-to-run)
8. [Future Improvements](#future-improvements)

---

## Description

The **Mini Seller Console** is a React + Tailwind CSS application designed to:

* View and filter a list of **Leads**.
* Edit lead details via a **SlideOver panel**.
* Create **Opportunities** from existing leads.
* Display opportunities in a table with persistence using `localStorage`.
* Provide a responsive layout for both desktop and mobile.

This project focuses on **clean structure, React best practices, and simple UX**, without requiring a backend.

---

## Features (MVP)

1. **Leads List**

   * Load data from a local JSON file.
   * Fields: `id`, `name`, `company`, `email`, `source`, `score`, `status`.
   * Features:

     * Search by `name` or `company`.
     * Filter by `status`.
     * Sort by `score` descending.
     * Simple pagination (10 items per page).

2. **Lead Detail Panel**

   * Click a lead row to open a SlideOver panel.
   * Inline edit for `status` and `email` with basic validation.
   * Save and cancel actions with error handling.

3. **Opportunity Creation**

   * Convert a lead into an opportunity with the following fields:

     * `id`, `leadId`, `name`, `accountName`, `stage`, `amount` (optional), `createdAt`.
   * Show all opportunities in a table.

4. **UX & States**

   * Handles loading, empty, and error states.
   * Designed to handle \~100 leads smoothly.

5. **Optional Enhancements**

   * Persist filters/sort in `localStorage`.
   * Optimistic updates with rollback on failure simulation.
   * Fully responsive layout.

---

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mini-seller-console.git

# Navigate into the project
cd mini-seller-console

# Install dependencies
npm install

# Run the development server
npm run dev
```

---

## Project Structure

```
src/
 ├─ components/
 │   ├─ atoms/
 │   │   ├─ Badge.tsx
 │   │   ├─ Button.tsx
 │   │   ├─ DropDown.tsx
 │   │   ├─ Filter.tsx
 │   │   ├─ LeadRow.tsx
 │   │   ├─ OpportunityCreate.tsx
 │   │   ├─ SearchBar.tsx
 │   │   └─ SortBy.tsx
 │   ├─ molecules/
 │   │   ├─ LeadEdit.tsx
 │   │   ├─ LeadList.tsx
 │   │   ├─ OpportunityList.tsx
 │   │   ├─ Pagination.tsx
 │   │   └─ SlideOverModal.tsx
 ├─ contexts/
 │   ├─ LeadContext.tsx
 │   └─ SelectedLeadContext.tsx
 ├─ data/
 │   └─ leads.json
 ├─ hooks/
 │   └─ useLocalStorage.tsx
 ├─ utils/
 │   ├─ convertDataLead.ts
 │   ├─ getLastUpdated.tsx
 │   ├─ LeadStatusIcon.ts
 │   └─ validateEmail.ts
 ├─ types/
 │   └─ index.ts
 ├─ App.css
 ├─ App.tsx
 ├─ index.css
 ├─ main.tsx
 └─ vite-env.d.ts

```

---
## Main Components

- **LeadList**: Displays a list of leads with pagination support.  
- **LeadRow**: Represents each lead as a row/card with its details.  
- **LeadEdit**: Slide-over form for editing an existing lead.  
- **SlideOverModal**: Reusable slide-over panel used for editing leads or creating opportunities.  
- **OpportunityCreate**: Form for creating new opportunities from the selected lead.  
- **OpportunityList**: Displays all opportunities stored in `localStorage`.  
- **Pagination**: Simple pagination component used for leads and opportunities.  
- **SearchBar**: Input field for searching and filtering leads.  
- **SortBy**: Dropdown component for sorting leads.  
- **Filter**: Component for filtering leads based on specific criteria.  
- **Badge**: Small UI element for displaying lead status or tags.  
- **Button**: Reusable button component.  
- **DropDown**: Reusable dropdown for selecting options.  

---

## Hooks & Contexts

- **useLocalStorage**: Custom hook for persisting state in `localStorage`.  
- **LeadContext**: Provides access to leads, including search, filter, and sort operations.  
- **SelectedLeadContext**: Tracks the currently selected lead and the opportunity creation state.  

---

## How to Run

1. Start the development server:

```bash
npm run dev
```

2. Open the application at:

```
http://localhost:5173
```

3. Interact with leads, edit details, and create opportunities. All opportunities are saved locally.

---
