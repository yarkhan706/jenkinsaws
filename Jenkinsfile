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
                checkout scm // Automatically clones the branch being built
            }
        }
        stage('Build') {
            steps {
                echo 'Building the Project...'
                // Add any build steps required for your application
                // Uncomment and modify the following if needed:
                // sh 'npm install && npm run build' // For Node.js projects
                // sh './mvnw package'             // For Maven projects
            }
        }
        stage('Deploy to Apache') {
            steps {
                echo 'Deploying to Apache Server...'
                // Ensure only relevant files are copied
                sh '''
                scp -r ./build/* ubuntu@44.203.126.229:/var/www/html
                '''
                echo 'Deployment successful!'
            }
        }
    }
    post {
        always {
            echo 'Pipeline execution finished.'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
