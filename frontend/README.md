# Gabb1337 Portfolio

This is a modern portfolio website built with Angular, featuring a responsive design and smooth animations. The website showcases my work, skills, and experience in web development.

## Features

- Modern and responsive design
- Smooth scroll animations
- Dynamic content loading
- Contact form
- Mobile-friendly navigation
- Portfolio showcase
- About section with tabs
- Services section
- Social media integration

## Technologies Used

- Angular 17
- SCSS
- Font Awesome
- Intersection Observer API
- TypeScript
- RxJS

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gabriel1337ro/portfolio.git
cd portfolio/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

### Building for Production

To build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/frontend` directory.

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   └── footer/
│   │   ├── models/
│   │   ├── pages/
│   │   │   └── home/
│   │   └── services/
│   ├── assets/
│   │   └── images/
│   └── environments/
├── angular.json
├── package.json
├── tsconfig.json
└── vercel.json
```

## Deployment

The project is configured for deployment on Vercel. The deployment process is automated through GitHub integration.

To deploy manually:

```bash
vercel deploy --prod
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Gabriel - gabriel1337ro@gmail.com

Project Link: [https://github.com/gabriel1337ro/portfolio](https://github.com/gabriel1337ro/portfolio)
