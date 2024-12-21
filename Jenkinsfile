pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    stages {
        stage('Deploy') {
            steps {
                script {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@44.203.126.229 '
                            cd /var/www/html &&
                            sudo git pull origin main
                        '
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
