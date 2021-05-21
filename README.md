
## Windows installation

### Step 1: Manual installation
* To correctly build and test projects, you need to install manually:
  - **JDK 1.8**
    - download link: [jdk-8u281-windows-x64.exe](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html#license-lightbox)
    - requires an Oracle accounmt
    - Verify that java is in the Path and you have a JAVA_HOME variable
      - where.exe java
      - If not found follow this tutorial ([link](https://mkyong.com/java/how-to-set-java_home-on-windows-10/))
  - **Docker DEsktop for Windows**
    - Download and install: [link](https://docs.docker.com/docker-for-windows/install/)

### Step 1: Run ``install.cmd`` in script/

- Then to install the following packages run ``./install.cmd`` in adminstrator mode.
  - **Chocolatey 0.10.15**
  - **Node LTS 14.15.5+**
  - **GNU Make 4.3**


### Step 3: Run ``init.cmd`` in script/

- Install **Maven 3.6.3** if not installed and initialize Nexus access variables.

## Build, Test, Package and Deploy
- The **makefile** runs four main steps: initializing, building, testing and deploying all projects:
  - To run all at once:
    - ``run.cmd profile=dev``
  - If you want to run seperate steps:
    - **Build**
      - ``run.cmd profile=dev build ``: compile all maven projects
      - ``run.cmd build-web ``: build angular maven project
    - **Test**
      - ``run.cmd profile=dev test ``: run maven projects tests
  
### Profiles

- Three profiles are created:
  - **dev**: using docker cluster
  - **debug**: to be used while debugging or using an IDE
  - **envtest**: to be used when deploying to test environment

#### How to use profiles:

- **dev** profile:
  - ``run.cmd profile=dev `` to run all services in docker cluser

- **debug** profile:
  - Add `` profile=debug `` to your IDE run commands to use it in localhost

- **envtest** profile:
  - ``run.cmd profile=envtest `` to run configurations specific to test environment

### How to use IHM locally

- **Step 1**: Run the IHM using your usual IDE and its entrypoint is at http://localhost:8858 (api-gateway's port)
- **Step 2**: Run api-gateway in your IDE (by default the profile ran is *debug* so no need to define it explicitly)
- **Step 3**: Run the other services with profile dev as indicated in the *Build and setup per services*

#### How NOT to use profiles:

- For microservices which call another microservice: ms_persona and ms_store
  - they must me in the **same profile mode as api_gateway** or else it won't be able to call the called microservices

### Build and setup per services

- All of the following services can be built individually or combined but the following naming must be respected:
  - mysql database: **db**
  - api_gateway: **api-gateway**
  - ms_auth: **auth**
  - ms_persona: **persona**
  - ms_skill: **skill**
  

#### Examples  
- For an **initial** setup, make sure you stop all running containers then run the necessary containers  (for example: db, api-gateway and auth):
    - ``run.cmd kill ``
    - ``run.cmd profile=dev db api-gateway auth ``




## Linux
- Work in progress..
