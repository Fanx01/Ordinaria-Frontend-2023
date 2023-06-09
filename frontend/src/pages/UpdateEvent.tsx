import UpdateEvent from "@/components/updateEvent";

export default function Home() {
  return (
    <>
      <div className="container">
        <h1>Eventos API</h1>
        <div>
          <UpdateEvent />
        </div>
      </div>
    </>
  );
}
