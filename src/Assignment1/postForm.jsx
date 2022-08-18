import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./post.scss";

const PostForm = () => {
  const [post, setPost] = useState([]);

  const { register, handleSubmit, watch } = useForm();

  const astroid = watch("astroid");

  const isValid = astroid;

  const onSubmit = (data) => {
    console.log(data);
    const url = `https://api.nasa.gov/neo/rest/v1/neo/${
      data.astroid ? data.astroid : post.id
    }?api_key=gSdn548JTrDD9h7xasz4o8KgjBBvCklb73yubIq5`;
    axios.get(url).then((response) => {
      setPost(response.data);
      console.log(response.data);
    });
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const onRandom = () => {
    const url = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY";
    axios.get(url).then((response) => {
      //   setPost(response.data.near_earth_objects[0]);
      setPost(
        response.data.near_earth_objects[
          getRandomInt(response.data.near_earth_objects.length)
        ]
      );
      console.log("random", response.data.near_earth_objects[0]);
    });
  };

  return (
    <div className="App-header">
      <form onSubmit={handleSubmit(onSubmit)} className="col-md-4">
        <input
          className="border border-primary rounded-3  p-2"
          id="name"
          type="text"
          placeholder="Astroid"
          {...register("astroid")}
        />
        <div className="mt-3 d-flex p-2 justify-content-evenly col-md-12">
          <button
            className={(isValid ? "enablebtn " : "disablebtn", "col-md-4")}
            type="submut"
            disabled={!isValid}
          >
            Submit
          </button>
          <button type="button" onClick={onRandom} className="col-md-6">
            Random Asteroid
          </button>
        </div>
      </form>

      <div className="result-show mt-4 text-start">
        <p> id: {post.id}</p>
        <p> Name: {post.name}</p>
        <p>
          {" "}
          JPL_URL: <a href={post.nasa_jpl_url}>{post.nasa_jpl_url}</a>
        </p>

        <p>
          is_potentially_hazardous_asteroid :{" "}
          {typeof post.is_potentially_hazardous_asteroid === "boolean"
            ? post.is_potentially_hazardous_asteroid
              ? "True"
              : "False"
            : ""}
        </p>
      </div>
    </div>
  );
};
export default PostForm;
