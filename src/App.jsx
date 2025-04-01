import React, { useState } from "react";
import PolicyList from "./components/PolicyList";
import PolicyForm from "./components/PolicyForm";

function App() {
  const [policyToEdit, setPolicyToEdit] = useState(null);

  return (
    <div>
      <h1>Insurance Policy Management</h1>
      <PolicyForm policyToEdit={policyToEdit} onSuccess={() => setPolicyToEdit(null)} />
      <PolicyList onEdit={setPolicyToEdit} />
    </div>
  );
}

export default App;
