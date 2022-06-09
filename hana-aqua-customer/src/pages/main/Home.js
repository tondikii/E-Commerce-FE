import { useState } from "react";
import { useEffect } from "react";
import apiInstance from "../../configs/api";

export default function HomePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    apiInstance
      .get("/products/get")
      .then(({ data }) => {
        console.log({ data });
        setData(data.rows);
      })
      .catch((err) => console.log({ err }));
  }, []);

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-blue-900 text-5xl font-semibold">
          Loading...
        </h1>
        <div className="">
          {/* <img src={data[0].imageURL} */}
        </div>
      </div>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Home Page!</h1>
    </div>
  );
}
