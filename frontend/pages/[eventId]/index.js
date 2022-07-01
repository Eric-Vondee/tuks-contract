import { MongoClient, ObjectId } from "mongodb";
import EventDetail from "../../components/BuyTicket/EventDetail";

function EventDetails(props) {
  return (
    <div>
      <EventDetail
        eventId={props.eventData.eventId}
        eventName={props.eventData.eventName}
        organizers={props.eventData.organizers}
        amount={props.eventData.amount}
        image={props.eventData.image}
        eventDate={props.eventData.eventDate}
        PartiNum={props.eventData.PartiNum}
        eventType={props.eventData.eventType}
        Shortdesc={props.eventData.Shortdesc}
        desc={props.eventData.desc}
      />
    </div>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.MongoURi);

  const db = client.db();

  const ticketCollection = db.collection("tickets");

  const eventData = await ticketCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: eventData.map((event) => ({
      params: { eventId: event._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const client = await MongoClient.connect(process.env.MongoURi);

  const db = client.db();

  const ticketCollection = db.collection("tickets");

  const selectedEventData = await ticketCollection.findOne({
    _id: ObjectId(eventId),
  });

  client.close();

  return {
    props: {
      eventData: {
        id: selectedEventData._id.toString(),
        eventId: selectedEventData.id,
        eventName: selectedEventData.eventName,
        organizers: selectedEventData.organizers,
        amount: selectedEventData.amount,
        image: selectedEventData.image,
        desc: selectedEventData.desc,
        Shortdesc: selectedEventData.Shortdesc,
        category: selectedEventData.category,
        eventDate: selectedEventData.eventDate,
        PartiNum: selectedEventData.PartiNum,
        eventType: selectedEventData.eventType,
      },
    },
  };
}

export default EventDetails;
