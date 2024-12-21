// pipeline {
//     agent any
//     stages {
//         stage('Hello') {
//             steps {
//                 echo 'Hello, World!'
//             }
//         }
//     }
// }
pipeline {
    agent any
    triggers {
        githubPush() // Trigger the job when a GitHub push event occurs
    }
    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning Repository...'
                checkout scm // Pull the code from the branch
            }
        }
        stage('Build') {
            steps {
                echo 'Building the Project...'
                // Uncomment and modify the following line for your specific build
                // sh 'npm install && npm run build' // Example for Node.js projects
                // sh './mvnw package'             // Example for Maven projects
            }
        }
        stage('Deploy to Apache') {
            steps {
                echo 'Deploying to Apache Server...'
                sh '''
                scp -r * ubuntu@44.203.126.229:/var/www/html
                '''
            }
        }
    }
}
