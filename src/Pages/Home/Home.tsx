import { collection, getDocs } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import {  db } from "../../config/config";
import { IData, IPost } from "../../interfaces/interfaces";
import { Post } from "../../components/Post/Post";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

export const Home: FC = () => {
  const [posts, setPosts] = useState<IData[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    async function getUser() {
      const postsColl = collection(db, "posts");
      getDocs(postsColl)
        .then((querySnapshot) => {
          const posts: IData[] = [];
          querySnapshot.forEach((doc) => {
            posts.push({
              id: doc.id,
              data: doc.data() as IPost,
            });
          });
          setPosts(posts);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
    getUser();
  }, []);

  const renderPosts = () => {
    if (posts) {
      return posts.map((post) => <Post key={post.id} data={post} />);
    }
  };

  return (
    <>
      {console.log(user)}
      {renderPosts()}
    </>
  );
};
