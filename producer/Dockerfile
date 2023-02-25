FROM amazonlinux:2
RUN yum update -y
RUN yum install awslogs -y
RUN yum install amazon-cloudwatch-agent -y
RUN amazon-linux-extras install epel
RUN yum install -y gcc-c++ make -y
RUN curl -sL https://rpm.nodesource.com/setup_16.x |  bash -

RUN yum install nodejs -y

WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run build

CMD ["npm","start"]