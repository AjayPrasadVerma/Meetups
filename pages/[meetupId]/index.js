import { useRouter } from "next/router";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export default MeetupDetails;

/**
 * when we using dynamic page it's required to use @getStaticPath method it's helps to pre-generate the code
 * on server
 *
 * @fallback - this key tell next.js whetehr your path array conatin all supported parameter value or just some
 * of then,
 * if fallback: false => that means that means our path supported all contained meetupsId value, if user enter
 * any path that is not defined here the it generate 404 error
 *
 * if fallback: false => that means if user enter any path that is not defined here the it generate try to
 * generate that page dynamically
 */
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://ajay:ajay123@ajay.0ekwgey.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetupsId = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking", // that means i defined all supported path
    paths: meetupsId.map((id) => ({
      params: {
        meetupId: id._id.toString(),
      },
    })),
  };
}

/**
 * if you don't have dynamic id
 * 
 export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: 'm1',
        },
      },
      {
        params: {
          meetupId: 'm2',
        },
      },
    ],
  };
}
 */

/**
 * @getStaticProps(context) through context also we can get the params like useRouter
 */
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  //   console.log(meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://ajay:ajay123@ajay.0ekwgey.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetups = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  // console.log(selectedMeetups);
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetups._id.toString(),
        title: selectedMeetups.title,
        image: selectedMeetups.image,
        address: selectedMeetups.address,
        description: selectedMeetups.description,
      },
    },
  };
}
