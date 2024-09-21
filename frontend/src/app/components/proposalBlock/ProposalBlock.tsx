import "./proposalBlock.scss";
import { RxCross2 } from "react-icons/rx";
function ProposalBlock() {
  return (
    <>
      <div className="proposalBlock flex items-center justify-between p-3">
        <h1 className="text-xl font-bold text-white ">Proposal</h1>
        <RxCross2 className="text-red-700" />
      </div>
    </>
  );
}

export default ProposalBlock;
