import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "test-app",
  brokers: ["b-2.transactionskafkaclust.5gnbas.c2.kafka.us-west-2.amazonaws.com:9094","b-1.transactionskafkaclust.5gnbas.c2.kafka.us-west-2.amazonaws.com:9094"],
});

const consumer = kafka.consumer({ groupId: "test-group" });
const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "transactions", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("Received: ", {
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};
run().catch(console.error);