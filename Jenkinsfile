pipeline {
    agent any
    
    environment {
        // Define SSH credentials ID that should be configured in Jenkins
        SSH_CREDS = credentials('apache-ssh-key')
    }
    
    triggers {
        githubPush()
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning Repository...'
                // Clean workspace before cloning
                cleanWs()
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building the Project...'
                // Add build steps based on your project type
                script {
                    // Uncomment and modify based on your project:
                    // if (fileExists('package.json')) {
                    //     sh 'npm install && npm run build'
                    // } else if (fileExists('pom.xml')) {
                    //     sh './mvnw clean package'
                    // }
                }
            }
        }
        
        stage('Deploy to Apache') {
            steps {
                echo 'Deploying to Apache Server...'
                // Add error handling and proper SSH deployment
                script {
                    // Ensure build directory exists
                    sh 'if [ ! -d "./build" ]; then echo "Build directory not found"; exit 1; fi'
                    
                    // Using SSH credentials and proper error handling
                    sshagent([SSH_CREDS]) {
                        sh '''
                            # Add host key checking exception
                            ssh-keyscan -H 44.203.126.229 >> ~/.ssh/known_hosts
                            
                            # Ensure destination directory exists
                            ssh ubuntu@44.203.126.229 'sudo mkdir -p /var/www/html && sudo chown -R ubuntu:ubuntu /var/www/html'
                            
                            # Deploy files
                            scp -r ./build/* ubuntu@44.203.126.229:/var/www/html/
                            
                            # Set proper permissions
                            ssh ubuntu@44.203.126.229 'sudo chown -R www-data:www-data /var/www/html'
                        '''
                    }
                }
                echo 'Deployment successful!'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution finished.'
            // Clean workspace after build
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
            // Add notification steps here if needed
            // mail to: 'team@example.com',
            //      subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
            //      body: "Something is wrong with ${env.BUILD_URL}"
        }
    }
}
