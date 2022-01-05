import Iframe from "react-iframe";
import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  console.log(user);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
    <>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 pg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>

        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="h-96">
                <Iframe
                  url="https://app.powerbi.com/view?r=eyJrIjoiZTlkMDc0ZTgtYzAwNS00ZmE4LTg1Y2EtMjRkMzAwZDM5NGZhIiwidCI6IjAwYjVkZjI0LWY3YmMtNDZkYi05YmYzLThmMTYyMjQ2NjA5NCJ9"
                  width="1220"
                  height="600"
                ></Iframe>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
