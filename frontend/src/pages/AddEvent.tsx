import CreateEvent from "@/components/createEvent";

export default function Home() {
  return (
    <>
      <div className="container">
        <h1>Eventos API</h1>
        <div>
          <CreateEvent />
        </div>
      </div>
    </>
  );
}