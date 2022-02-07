pipeline {
    agent any
    
    environment{
        CI='true'
    }

    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Buid') {
            steps {
                echo 'Building this application'
                 
                 sh 'npm install'
                sh 'npm start'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying'
            }
        }
        stage('Test') {
            steps {
                echo 'npm test'
            }
        }
        stage('Release') {
            steps {
                echo 'Releasing'
            }
        }
    }
}
