function TicketButton({ buyTicket }: { buyTicket: () => void }) {
  return (
    <div className="w-[100%]">
      <div
        className="btn_ticket"
        onClick={() => {
          buyTicket();
        }}
      ></div>
    </div>
  );
}

export default TicketButton;
