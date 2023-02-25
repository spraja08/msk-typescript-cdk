import { Kafka } from "kafkajs";

const TOPIC = process.env.TOPIC_NAME;
const BROKERS = process.env.BOOTSTRAP_ADDRESS?.split(',')

const kafka = new Kafka({
  clientId: "consumer-app",
  brokers: BROKERS,
  ssl: true
});

const consumer = kafka.consumer({ groupId: "consumer-group" });
const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC, fromBeginning: true });

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