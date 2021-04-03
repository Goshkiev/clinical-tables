import Link from "next/link";
import { GetServerSideProps } from "next";
import SearchService, {
  TopHierarchicalNpiKeys,
} from "../../../services/search";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { npi } = params;

  const data = await SearchService.getUserTableData({
    terms: npi,
    ef: Object.values(TopHierarchicalNpiKeys).toString(),
  });

  return {
    props: { data },
  };
};

function DetailsPage({ data }) {
  return (
    <div>
      <Link href={`/`}>back</Link>
      <table>
        <tbody>
          {data.map(([key, val], index) => {
            return (
              <tr key={index}>
                <td>{key}</td>
                <td>{val}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DetailsPage;
