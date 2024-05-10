npm init -y
npm i express

npm i typescript ts-node @types/node @types/express --save-dev
npm i jest --save-dev

npx tsc --init

go to the tsconfig and change the outdir to save in ./dist and rootdir to ./src
create the folders dist and src on the root

uncomment the following aswell `moduleresolution`

install nodemon npm i nodemon

npm i body-parser

<!-- setup database -->

npm i pg @types/pg
