# Trump Administration Wins Database

A searchable website to catalog and display Trump administration achievements with full curation capabilities.

## Features

### Public Website
- **Searchable Database**: Search across all fields (title, description)
- **Multi-dimensional Filtering**: Filter by Area, Size, and Person simultaneously
- **Chronological Display**: Wins displayed newest to oldest by default
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Easy Navigation**: Clean, functional interface with clear filter controls

### Admin Panel
- **Simple CMS**: Add, edit, and delete wins easily
- **User-friendly Forms**: Clear input fields with validation
- **Real-time Updates**: Changes appear immediately
- **No Authentication Required**: (Can be added later if needed)

## Tech Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Database**: SQLite via better-sqlite3
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Deployment**: Optimized for Vercel (or any Node.js hosting)

### Why This Stack?

- ✅ **Single Codebase**: Both admin panel and public site in one project
- ✅ **Zero Setup**: SQLite requires no database server
- ✅ **Type-Safe**: Full TypeScript coverage
- ✅ **Easy Deployment**: Deploy to Vercel in one click
- ✅ **Fast Development**: Hot reload, server components, API routes built-in
- ✅ **Scalable**: Can easily migrate to PostgreSQL for production

## Data Structure

Each "Win" entry contains:
- **Title**: Short title of the achievement
- **Description**: Detailed description
- **Area**: Category (Deportations, Economy, Military, DEI, Trade, etc.)
- **Size**: Impact level (Yuge, Bigly, Small)
- **Date**: When the win occurred
- **Person**: Who was responsible (Trump, JD Vance, Stephen Miller, etc.)
- **Source Link**: Optional URL for reference

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download the repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Seed the database with sample data** (optional)
   ```bash
   npm run seed
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Public Site: [http://localhost:3000](http://localhost:3000)
   - Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## Usage

### Adding Wins (Admin Panel)

1. Navigate to `/admin`
2. Click "Add New Win"
3. Fill out the form:
   - Enter title and description
   - Select area, size, and person from dropdowns
   - Choose the date
   - Optionally add a source link
4. Click "Add Win"

### Editing Wins

1. In the admin panel, find the win you want to edit
2. Click "Edit"
3. Make your changes
4. Click "Update Win"

### Deleting Wins

1. In the admin panel, click "Delete" on any win
2. Confirm the deletion

### Searching and Filtering (Public Site)

1. Use the search bar to find wins by keywords
2. Click filter buttons to narrow results:
   - **Area**: Filter by category
   - **Size**: Filter by impact level
   - **Person**: Filter by who was responsible
3. Combine multiple filters for precise results
4. Click "Clear all" to reset filters

## Project Structure

```
trump-wins/
├── app/
│   ├── admin/           # Admin panel page
│   ├── api/wins/        # API routes for CRUD operations
│   ├── page.tsx         # Public homepage
│   └── layout.tsx       # Root layout
├── components/
│   └── WinForm.tsx      # Reusable form component
├── lib/
│   ├── db.ts            # Database operations
│   └── constants.ts     # Dropdown options
├── scripts/
│   └── seed.ts          # Database seeding script
├── public/              # Static assets
└── wins.db              # SQLite database file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed` - Seed database with sample data
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy
5. Done! Your site is live

**Important Note for Vercel**:
- SQLite works in development but may have limitations on Vercel's serverless environment
- For production, consider migrating to Vercel Postgres or another hosted database
- The codebase is structured to make this migration straightforward

### Other Platforms

#### Netlify
```bash
npm run build
# Deploy the .next folder
```

#### Railway / Render
```bash
# These platforms support Node.js and SQLite out of the box
# Just connect your repo and they'll auto-deploy
```

#### Traditional VPS (DigitalOcean, AWS EC2, etc.)
```bash
npm run build
npm run start
# Use PM2 or similar process manager to keep it running
```

## Database

### SQLite (Current)
- File-based database (`wins.db`)
- No setup required
- Perfect for small to medium datasets
- Easy to backup (just copy the file)

### Migrating to PostgreSQL (Production)

When you're ready to scale:

1. Install PostgreSQL adapter:
   ```bash
   npm install pg
   ```

2. Update `lib/db.ts` to use PostgreSQL instead of SQLite

3. Update connection string in `.env`:
   ```
   DATABASE_URL="postgresql://user:password@host:port/database"
   ```

The database schema and operations remain the same!

## Customization

### Adding New Areas/Categories

Edit `lib/constants.ts`:
```typescript
export const AREAS = [
  'Your New Category',
  // ... existing categories
];
```

### Adding New People

Edit `lib/constants.ts`:
```typescript
export const PERSONS = [
  'New Person Name',
  // ... existing people
];
```

### Styling

- All styles use Tailwind CSS classes
- Edit component files to change appearance
- Modify `app/globals.css` for global styles

## Security Notes

- No authentication is currently implemented
- For production use, consider adding:
  - Password protection for `/admin` route
  - Rate limiting on API endpoints
  - Input sanitization (currently using basic validation)
  - HTTPS enforcement

## Troubleshooting

### Database locked error
If you see "database is locked", make sure only one instance is running.

### Port already in use
Change the port: `npm run dev -- -p 3001`

### Module not found errors
Run `npm install` to ensure all dependencies are installed.

## Future Enhancements

- [ ] User authentication for admin panel
- [ ] CSV/Excel export functionality
- [ ] Advanced analytics and statistics
- [ ] Email notifications for new wins
- [ ] API key access for third-party integrations
- [ ] Multi-user roles and permissions
- [ ] Audit log for changes

## Support

For issues or questions:
1. Check this README
2. Review the code comments
3. Open an issue on GitHub (if applicable)

## License

This project is open source and available for use and modification.

---

Built with Next.js, TypeScript, and SQLite
