# contactUs

I am using docker for both front end and back end
Please follow the below steps to execute

Install docker and docker compose in your local machine before running the project
Docker Compose version v2.12.2

===========================Front end=======================================

1. docker compose build && docker compose up

To check the application go to browser and enter the below url
http://localhost:4000/


===========================Back end=======================================

For laravel I have used the sail build

1. ./vendor/bin/sail up

While running this command it automatically installed the required docker images.

I am using the mailhog to send mail.

To check mail functionality. Go to your browser and enter the below url

http://localhost:8025/

