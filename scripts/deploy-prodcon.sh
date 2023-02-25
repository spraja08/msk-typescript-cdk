kafka_arn=$(aws kafka list-clusters --output text --query 'ClusterInfoList[*].ClusterArn') && echo "$kafka_arn"
kafka_brokers=$(aws kafka get-bootstrap-brokers --cluster-arn $kafka_arn --output text --query '*') && echo "$kafka_brokers"
topicName=transactions

cd ../infra || exit
echo "Deploying FargateStack..."
cdk deploy FargateStack --parameters FargateStack:bootstrapAddress="$kafka_brokers" --parameters FargateStack:topicName="$topicName" --require-approval never --verbose
