import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

// our-domain.com/new-meetup
function NewPeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    // const response = await fetch("https://localhost:3000/api/new-meetup");
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Add a new Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking oppertunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}

export default NewPeetupPage;
