import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function Customer() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkIsLogin = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/get-user`,
          {
            credentials: "include",
          }
        );
        const result = await res.json();
        if (res.ok) {
          setIsLogin(true);
        }
      } catch (e) {}
    };
    checkIsLogin();
  }, []);

  return (
    <>
      <header className="z-50 flex flex-wrap w-full md:justify-start md:flex-nowrap py-7">
        <nav className="relative flex flex-wrap items-center w-full px-4 mx-auto max-w-7xl md:grid md:grid-cols-12 basis-full md:px-6 md:px-8">
          <div className="md:col-span-3">
            {/* >logo */}
            <Link
              className="flex-none inline-block text-xl font-semibold rounded-xl focus:outline-none focus:opacity-80"
              to="/"
              aria-label="Preline"
            >
              CampusCrave
            </Link>
          </div>

          <div className="flex items-center py-1 gap-x-1 md:gap-x-2 ms-auto md:ps-6 md:order-3 md:col-span-3">
            {!isLogin && (
              <>
                {/* >login */}
                <Link
                  to="/auth/login"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-black bg-white border border-gray-200 gap-x-2 rounded-xl hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-white/10 dark:text-white dark:hover:text-white dark:focus:text-white"
                >
                  Login
                </Link>
                {/* >register */}
                <Link
                  to="/auth/register/customer"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-black transition border border-transparent gap-x-2 rounded-xl bg-lime-400 hover:bg-lime-500 focus:outline-none focus:bg-lime-500 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Register
                </Link>
              </>
            )}

            {isLogin && (
              <>
                {/* >favorite */}
                {/* <Link
                  to="/favorite"
                  className="inline-flex justify-center items-center size-[38px] rounded-xl bg-lime-400 text-white hover:bg-lime-500 dark:bg-lime-400 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="16"
                    hanging="16"
                  >
                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                  </svg>
                </Link> */}
                {/* >cart */}
                <Link
                  to="/cart"
                  className="inline-flex justify-center items-center size-[38px] rounded-xl bg-lime-400 text-white hover:bg-lime-500 dark:bg-lime-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    width="16"
                    hanging="16"
                  >
                    <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                  </svg>
                </Link>
                {/* >account */}
                <Link
                  to="/account"
                  className="inline-flex justify-center items-center size-[38px] rounded-xl bg-lime-400 text-white hover:bg-lime-500 dark:bg-lime-400 "
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0"
                      fill="#2e3436"
                    />
                  </svg>
                </Link>
              </>
            )}

            {/* menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                id="hs-navbar-hcail-collapse"
                aria-expanded="false"
                aria-controls="hs-navbar-hcail"
                aria-label="Toggle navigation"
                data-hs-collapse="#hs-navbar-hcail"
              >
                <svg
                  className="hs-collapse-open:hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hidden hs-collapse-open:block shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div
            id="hs-navbar-hcail"
            className="hidden overflow-hidden transition-all duration-300 hs-collapse basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6"
            aria-labelledby="hs-navbar-hcail-collapse"
          >
            <div className="flex flex-col mt-5 gap-y-4 gap-x-0 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
              <div>
                {/* >home */}
                <NavLink
                  className={({ isActive }) => {
                    return isActive
                      ? "relative inline-block text-black hover:text-lime-500 focus:outline-none dark:text-white before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400"
                      : "relative inline-block text-black hover:text-lime-500 focus:outline-none dark:text-white";
                  }}
                  to="/"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </div>
              <div>
                {/* >meals */}
                {/* <NavLink
                  className={({ isActive }) => {
                    return isActive
                      ? "relative inline-block text-black hover:text-lime-500 focus:outline-none dark:text-white before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400"
                      : "relative inline-block text-black hover:text-lime-500 focus:outline-none dark:text-white";
                  }}
                  to="/meals"
                  aria-current="page"
                >
                  Meals
                </NavLink> */}
              </div>
              <div>
                {/* >vendors */}
                {/* <NavLink
                  className={({ isActive }) => {
                    return isActive
                      ? "relative inline-block text-black hover:text-lime-500 focus:outline-none dark:text-white before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400"
                      : "relative inline-block text-black hover:text-lime-500 focus:outline-none dark:text-white";
                  }}
                  to="/vendors"
                >
                  Vendors
                </NavLink> */}
              </div>
              <div>
                {/* >categories */}
                {/* <NavLink
                  className={({ isActive }) => {
                    return isActive
                      ? "relative inline-block text-black hover:text-lime-500 focus:outline-none dark:text-white before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400"
                      : "relative inline-block text-black hover:text-lime-500 focus:outline-none dark:text-white";
                  }}
                  to="/categories"
                >
                  Categories
                </NavLink> */}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      {/* <footer class="relative overflow-hidden bg-neutral-900">
        <svg
          class="absolute -bottom-20 start-1/2 w-[1900px] transform -translate-x-1/2"
          width="2745"
          height="488"
          viewBox="0 0 2745 488"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 330.864C232.505 403.801 853.749 527.683 1482.69 439.719C2111.63 351.756 2585.54 434.588 2743.87 487"
            class="stroke-neutral-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 308.873C232.505 381.81 853.749 505.692 1482.69 417.728C2111.63 329.765 2585.54 412.597 2743.87 465.009"
            class="stroke-neutral-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 286.882C232.505 359.819 853.749 483.701 1482.69 395.738C2111.63 307.774 2585.54 390.606 2743.87 443.018"
            class="stroke-neutral-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 264.891C232.505 337.828 853.749 461.71 1482.69 373.747C2111.63 285.783 2585.54 368.615 2743.87 421.027"
            class="stroke-neutral-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 242.9C232.505 315.837 853.749 439.719 1482.69 351.756C2111.63 263.792 2585.54 346.624 2743.87 399.036"
            class="stroke-neutral-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 220.909C232.505 293.846 853.749 417.728 1482.69 329.765C2111.63 241.801 2585.54 324.633 2743.87 377.045"
            class="stroke-neutral-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 198.918C232.505 271.855 853.749 395.737 1482.69 307.774C2111.63 219.81 2585.54 302.642 2743.87 355.054"
            class="stroke-neutral-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 176.927C232.505 249.864 853.749 373.746 1482.69 285.783C2111.63 197.819 2585.54 280.651 2743.87 333.063"
            class="stroke-neutral-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 154.937C232.505 227.873 853.749 351.756 1482.69 263.792C2111.63 175.828 2585.54 258.661 2743.87 311.072"
            class="stroke-neutral-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 132.946C232.505 205.882 853.749 329.765 1482.69 241.801C2111.63 153.837 2585.54 236.67 2743.87 289.082"
            class="stroke-neutral-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 110.955C232.505 183.891 853.749 307.774 1482.69 219.81C2111.63 131.846 2585.54 214.679 2743.87 267.091"
            class="stroke-neutral-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 88.9639C232.505 161.901 853.749 285.783 1482.69 197.819C2111.63 109.855 2585.54 192.688 2743.87 245.1"
            class="stroke-neutral-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 66.9729C232.505 139.91 853.749 263.792 1482.69 175.828C2111.63 87.8643 2585.54 170.697 2743.87 223.109"
            class="stroke-neutral-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 44.9819C232.505 117.919 853.749 241.801 1482.69 153.837C2111.63 65.8733 2585.54 148.706 2743.87 201.118"
            class="stroke-neutral-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 22.991C232.505 95.9276 853.749 219.81 1482.69 131.846C2111.63 43.8824 2585.54 126.715 2743.87 179.127"
            class="stroke-neutral-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 1C232.505 73.9367 853.749 197.819 1482.69 109.855C2111.63 21.8914 2585.54 104.724 2743.87 157.136"
            class="stroke-neutral-700/50"
            stroke="currentColor"
          />
        </svg>

        <div class="relative z-10">
          <div class="w-full max-w-7xl px-4 xl:px-0 py-10 lg:pt-16 mx-auto">
            <div class="inline-flex items-center ">
              <h1 className="text-xl font-semibold text-white">CampusCrave</h1>

              <div class="border-s border-neutral-700 ps-5 ms-5">
                <p class="text-sm text-neutral-400">
                  © All Rights Reserved by{" "}
                  <span className="font-bold underline ">Binary Fetch</span>.
                  2024.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer> */}
    </>
  );
}
