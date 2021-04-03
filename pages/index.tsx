import React, { useContext } from "react";
import Link from "next/link";
import { Context } from "../context";
import { SearchForm } from "../components/Search";
import { setSearchedData } from "../context/reducers/search";

function HomePage() {
  const { state, dispatch } = useContext(Context);
  return (
    <div>
      <SearchForm onSuccess={(payload) => dispatch(setSearchedData(payload))} />
      <ul>
        {state.searchedData.map(({ name, npi, type, address }) => (
          <Link key={npi} href={`/details/${npi}`}>
            <li>
              <span>{name}</span>
              <span>{npi}</span>
              <span>{type}</span>
              <span>{address}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
