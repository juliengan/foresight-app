# 4Sight : For a better industrial maintenance

Lucie Bottin - Mathys Goncalves - Céline Khauv - Nour-Eddine Oubenami - Neal Christopher Louokdom Fokam - Julie Ngan

M2-APP-BDML

## Technologies 
Python, Angular

<h2>Goal : Deploy a Predictive maintenance solution for enterprises</h2>

<h3>Overall :</h3> 
<p>- Extract our autoencoder model (see [https://github.com/MathysGoncalves/Automated-PdM](https://github.com/MathysGoncalves/Automated-PdM/tree/dev-mathys) for more details)</p>
<p>- Implement our Angular website for our clients</p>

<h3>🏡 Code Architecture 🏡</h3>

------------
    ├── angular-app
    │   ├── src
    │   │   ├── app
    │   │   |   └── board
    │   │   |   |   └── board.component.css
    │   │   |   |   └── board.component.html
    │   │   |   |   └── board.component.ts
    │   │   |   |   └── board.service.ts
    │   │   |   └── login
    │   │   |   |   └── login.component.css
    │   │   |   |   └── login.component.html
    │   │   |   |   └── login.component.ts
    │   │   |   |   └── login.service.ts
    │   │   |   └── nav
    │   │   |   |   └── nav.component.css
    │   │   |   |   └── nav.component.html
    │   │   |   |   └── nav.component.ts
    │   │   |   └── predictions
    │   │   |   |   └── predictions.component.css
    │   │   |   |   └── predictions.component.html
    │   │   |   |   └── predictions.component.ts
    │   │   |   |   └── predictions.service.ts
    │   │   |   └── postgres
    │   │   |   |   └── postgres.component.css
    │   │   |   |   └── postgres.component.html
    │   │   |   |   └── postgres.component.spec.ts
    │   │   |   |   └── postgres.component.ts
    │   │   |   └── test
    │   │   |   |   └── test.component.html
    │   │   |   |   └── test.component.ts
    │   │   |   └── upload
    │   │   |   |   └── upload.component.html
    │   │   |   |   └── upload.component.scss
    │   │   |   |   └── upload.component.ts
    │   │   |   |   └── upload.module.ts 
    │   │   |   |   └── upload.service.ts
    │   │   |   └── app-routing.module.ts
    │   │   |   └── app.component.css
    │   │   |   └── app.component.html
    │   │   |   └── app.component.spec.ts
    │   │   |   └── app.component.ts
    │   │   |   └── app.module.ts
    │   │   |   └── auth.guard.ts
    │   │   └── assets
    │   │   |   └── font/futura
    │   │   |   └── input
    │   │   |   └── login
    │   │   |   └── logo.png
    │   │   |   └── logo2.png
    │   │   └── favicon.ico
    │   │   └── index.html
    │   │   └── main.ts
    │   │   └── style.css
    │   ├── README.md
    │   ├── angular.json
    │   ├── package.json
    │   ├── tsconfig.app.json
    │   ├── tsconfig.json
    │   ├── tsconfig.spec.json 
    ├── models
    │   ├── autoencoder.h5
    │   ├── scaler_data.pkl
    |
    ├── README.md


<h3>4Sight client interface<h3>

<p>Login securely</p>
![Dashboard](images/login.png)
