import { Link, NavLink, Outlet } from "react-router-dom";

export default function Admin() {
  const isDashboardActive = () => {
    return window.location.pathname.split("/").length == 2;
  };

  return (
    <>
      <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 lg:ps-[260px] dark:bg-neutral-800 dark:border-neutral-700">
        <nav className="flex items-center w-full px-4 mx-auto sm:px-6 basis-full">
          <div className="flex gap-2 me-5 lg:me-0 lg:hidden">
            {/* >menu button */}
            <button
              type="button"
              className="flex items-center justify-center border border-gray-200 rounded-lg size-8 gap-x-2 hover:text-gray-500 focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-application-sidebar"
              aria-label="Toggle navigation"
              data-hs-overlay="#hs-application-sidebar"
            >
              <span className="sr-only">Toggle Navigation</span>
              <svg
                className="shrink-0 size-4"
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
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M15 3v18" />
                <path d="m8 9 3 3-3 3" />
              </svg>
            </button>

            {/* >logo */}
            <Link
              className="flex-none inline-block text-xl font-semibold rounded-md focus:outline-none focus:opacity-80 dark:text-white"
              to="/admin"
              aria-label="Preline"
            >
              CampusCrave
            </Link>
          </div>

          <div className="flex items-center justify-end w-full ms-auto md:justify-between gap-x-1 md:gap-x-3">
            <div className="block">H</div>
            <div className="flex flex-row items-center justify-end gap-1">
              <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
                {/* >notifications */}
                <button
                  id="hs-dropdown-notifications"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                  type="button"
                  className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="14"
                    hanging="14"
                  >
                    <path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416l400 0c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112l0 25.4c0 47.9 13.9 94.6 39.7 134.6L72.3 368C98.1 328 112 281.3 112 233.4l0-25.4c0-61.9 50.1-112 112-112zm64 352l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
                  </svg>
                  <span className="sr-only">Notifications</span>
                </button>

                {/* account */}
                <Link
                  className="size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:text-white"
                  to="/admin/account"
                >
                  <img
                    className="shrink-0 size-[38px] rounded-full"
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                    alt="Avatar"
                  />
                </Link>

                {/* >dropdown */}
                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                  role="notifications"
                  aria-orientation="vertical"
                  aria-labelledby="hs-dropdown-notifications"
                >
                  <div className="p-1.5 space-y-0.5">Chat</div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div
        id="hs-application-sidebar"
        className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform w-[260px] h-full hidden fixed inset-y-0 start-0 z-[60] bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 dark:bg-neutral-800 dark:border-neutral-700"
        role="dialog"
        tabindex="-1"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          <div className="px-6 pt-4">
            {/* >logo */}
            <Link
              className="flex-none inline-block text-xl font-semibold rounded-md text-lime-500 focus:outline-none focus:opacity-80 dark:text-white"
              to="/admin"
              aria-label="Preline"
            >
              CampusCrave
            </Link>
          </div>

          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <nav
              className="flex flex-col flex-wrap w-full p-3 hs-accordion-group"
              data-hs-accordion-always-open
            >
              <ul className="flex flex-col space-y-1">
                <li>
                  {/* >dashboard */}
                  <NavLink
                    className={() => {
                      return isDashboardActive()
                        ? "flex items-center gap-x-3.5 py-2 px-2.5 bg-lime-100 text-sm  rounded-lg hover:bg-lime-100 focus:outline-none focus:bg-lime-100 dark:bg-neutral-700 dark:text-white"
                        : "flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-lime-100 focus:outline-none focus:bg-lime-100 dark:bg-neutral-700 dark:text-white";
                    }}
                    to="/admin"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      width="14"
                      height="14"
                    >
                      <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                    </svg>
                    Dashboard
                  </NavLink>
                </li>

                <li>
                  {/* >vendor */}
                  <NavLink
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center gap-x-3.5 py-2 px-2.5 bg-lime-100 text-sm rounded-lg hover:bg-lime-100 focus:outline-none focus:bg-lime-100 dark:bg-neutral-700 dark:text-white"
                        : "flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-lime-100 focus:outline-none focus:bg-lime-100 dark:bg-neutral-700 dark:text-white";
                    }}
                    to="/admin/vendor"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      width="14"
                      height="14"
                    >
                      <path d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3 0 289.2zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z" />
                    </svg>
                    Vendor
                  </NavLink>
                </li>

                <li>
                  {/* >product */}
                  <NavLink
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center gap-x-3.5 py-2 px-2.5 bg-lime-100 text-sm rounded-lg hover:bg-lime-100 focus:outline-none focus:bg-lime-100 dark:bg-neutral-700 dark:text-white"
                        : "flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-lime-100 focus:outline-none focus:bg-lime-100 dark:bg-neutral-700 dark:text-white";
                    }}
                    to="/admin/product"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      width="14"
                      height="14"
                    >
                      <path d="M58.9 42.1c3-6.1 9.6-9.6 16.3-8.7L320 64 564.8 33.4c6.7-.8 13.3 2.7 16.3 8.7l41.7 83.4c9 17.9-.6 39.6-19.8 45.1L439.6 217.3c-13.9 4-28.8-1.9-36.2-14.3L320 64 236.6 203c-7.4 12.4-22.3 18.3-36.2 14.3L37.1 170.6c-19.3-5.5-28.8-27.2-19.8-45.1L58.9 42.1zM321.1 128l54.9 91.4c14.9 24.8 44.6 36.6 72.5 28.6L576 211.6l0 167c0 22-15 41.2-36.4 46.6l-204.1 51c-10.2 2.6-20.9 2.6-31 0l-204.1-51C79 419.7 64 400.5 64 378.5l0-167L191.6 248c27.8 8 57.6-3.8 72.5-28.6L318.9 128l2.2 0z" />
                    </svg>
                    Product
                  </NavLink>
                </li>

                <li>
                  {/* >review */}
                  <NavLink
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center gap-x-3.5 py-2 px-2.5 bg-lime-100 text-sm rounded-lg hover:bg-lime-100 focus:outline-none focus:bg-lime-100 dark:bg-neutral-700 dark:text-white"
                        : "flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-lime-100 focus:outline-none focus:bg-lime-100 dark:bg-neutral-700 dark:text-white";
                    }}
                    to="/admin/review"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      width="14"
                      height="14"
                    >
                      <path d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3 0 289.2zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z" />
                    </svg>
                    Review
                  </NavLink>
                </li>

                <li>
                  {/* >customer */}
                  <NavLink
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center gap-x-3.5 py-2 px-2.5 bg-lime-100 text-sm rounded-lg hover:bg-lime-100 focus:outline-none focus:bg-lime-100 dark:bg-neutral-700 dark:text-white"
                        : "flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-lime-100 focus:outline-none focus:bg-lime-100 dark:bg-neutral-700 dark:text-white";
                    }}
                    to="/admin/customer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      width="14"
                      height="14"
                    >
                      <path d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3 0 289.2zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z" />
                    </svg>
                    Customer
                  </NavLink>
                </li>

                <li>
                  {/* >order */}
                  <NavLink
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center gap-x-3.5 py-2 px-2.5 bg-lime-100 text-sm rounded-lg hover:bg-lime-100 focus:outline-none focus:bg-lime-100 dark:bg-neutral-700 dark:text-white"
                        : "flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-lime-100 focus:outline-none focus:bg-lime-100 dark:bg-neutral-700 dark:text-white";
                    }}
                    to="/admin/order"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      width="14"
                      height="14"
                    >
                      <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                    </svg>
                    Order
                  </NavLink>
                </li>

                <li>
                  {/* >loan */}
                  <NavLink
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center gap-x-3.5 py-2 px-2.5 bg-lime-100 text-sm rounded-lg hover:bg-lime-100 focus:outline-none focus:bg-lime-100 dark:bg-neutral-700 dark:text-white"
                        : "flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-lime-100 focus:outline-none focus:bg-lime-100 dark:bg-neutral-700 dark:text-white";
                    }}
                    to="/admin/loan"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      width="14"
                      height="14"
                    >
                      <path d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3 0 289.2zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z" />
                    </svg>
                    Loan
                  </NavLink>
                </li>

                <li>
                  {/* >logout */}
                  <NavLink
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center gap-x-3.5 py-2 px-2.5 bg-lime-100 text-sm rounded-lg hover:bg-lime-100 focus:outline-none focus:bg-lime-100 dark:bg-neutral-700 dark:text-white"
                        : "flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-lime-100 focus:outline-none focus:bg-lime-100 dark:bg-neutral-700 dark:text-white";
                    }}
                    to="/auth/logout"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="14"
                      height="14"
                    >
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                    </svg>
                    Logout
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="w-full lg:ps-64">
        <div className="p-4 space-y-4 sm:p-6 sm:space-y-6">
          <Outlet />
        </div>
      </div>
    </>
  );
}
