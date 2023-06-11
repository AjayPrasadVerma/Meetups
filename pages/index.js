import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

/**
 * @Head
 * head component allow us to add head element to the head of the page
 */
// HomePage component automatically get props from getStaticProps() methos

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of active react meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

/*
 * getStaticProps() - used to, the page is pre- generated during the build process
 * function name can't change
 * it must return object and 'props' name of property are compulsary
 *
 * revalidate: 1 :- means this page not generated only in during the build process it wiil be geneted on the
 * server in every 1second if the requerst happen.
 */

export async function getStaticProps() {
  // fetch data from an API or file system

  const client = await MongoClient.connect(
    "mongodb+srv://ajay:ajay123@ajay.0ekwgey.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

/**
 * @getServerSideProps this method does same as @getStaticProps but the differnce is it always run on the
 * server after deployment not only during build like ( @getStaticProps )
 *
 * function name can't change
 * it must return object
 * it must return object and 'props' name of property are compulsary
 */

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an API or file system
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
