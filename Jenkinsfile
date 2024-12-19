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
    agent any  // Run on any available Jenkins agent (e.g., master, a specific node)

    environment {
        // Set environment variables for SSH key and Apache server IP
        SSH_KEY = '/var/lib/jenkins/.ssh/jenkins_key'  // Path to the SSH private key
        SERVER_IP = '44.203.126.229'  // IP of your Apache server
        GIT_REPO = 'https://github.com/yourusername/yourrepo.git'  // GitHub repository URL
        GIT_BRANCH = 'main'  // Branch to pull from
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    // Clone the repository from GitHub
                    git url: "${GIT_REPO}", branch: "${GIT_BRANCH}"
                }
            }
        }

        stage('Deploy to Apache') {
            steps {
                script {
                    // SSH into the Apache server and pull the latest changes
                    sh """
                    ssh -i ${SSH_KEY} ubuntu@${SERVER_IP} 'cd /var/www/html && git pull origin ${GIT_BRANCH}'
                    """
                }
            }
        }

        stage('Restart Apache') {
            steps {
                script {
                    // Optionally, restart Apache to apply changes (if needed)
                    sh """
                    ssh -i ${SSH_KEY} ubuntu@${SERVER_IP} 'sudo systemctl restart apache2'
                    """
                }
            }
        }

        stage('Clean Up') {
            steps {
                // Clean up any temporary files if needed
                echo 'Cleaning up...'
            }
        }
    }

    post {
        success {
            echo 'Deployment succeeded!'
        }
        failure {
            echo 'Deployment failed.'
        }
        always {
            // This can run no matter the result (e.g., to clean up or notify)
            echo 'Pipeline execution finished.'
        }
    }
}
