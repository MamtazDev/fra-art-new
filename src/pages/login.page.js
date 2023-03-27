import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const Login = () => {
  return (
    <>
      <div className="back-to-home">
        <a
          href=""
          onClick={(e) => e.preventDefault()}
          className="back-button btn btn-pills btn-sm btn-icon btn-primary"
        >
          <FiArrowLeft className="icons" />
        </a>
      </div>

      <section className="position-relative">
        <div className="bg-video-wrapper">
          <iframe src="https://player.vimeo.com/video/502163294?background=1&autoplay=1&loop=1&byline=0&title=0"></iframe>
        </div>
        <div className="bg-overlay bg-linear-gradient-2"></div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className="d-flex flex-column min-vh-100 p-4">
                <div className="title-heading text-center my-auto">
                  <div className="form-signin px-4 py-5 bg-white rounded-md shadow-sm">
                    <form>
                      <h5 className="mb-4">Login</h5>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-floating mb-2">
                            <input
                              type="email"
                              className="form-control"
                              id="LoginEmail"
                              placeholder="name@example.com"
                            />
                            <label htmlFor="LoginEmail">Email Address:</label>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-floating mb-3">
                            <input
                              type="password"
                              className="form-control"
                              id="LoginPassword"
                              placeholder="Password"
                            />
                            <label htmlFor="LoginPassword">Password:</label>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="d-flex justify-content-between">
                            <div className="mb-3">
                              <div className="form-check align-items-center d-flex mb-0">
                                <input
                                  className="form-check-input mt-0"
                                  type="checkbox"
                                  value=""
                                  id="RememberMe"
                                />
                                <label
                                  className="form-check-label text-muted ms-2"
                                  htmlFor="RememberMe"
                                >
                                  Remember me
                                </label>
                              </div>
                            </div>
                            <small className="text-muted mb-0">
                              <Link
                                href="/reset-password"
                                className="text-muted fw-semibold"
                              >
                                Forgot password ?
                              </Link>
                            </small>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <button
                            className="btn btn-primary rounded-md w-100"
                            type="submit"
                          >
                            Sign in
                          </button>
                        </div>

                        <div className="col-12 text-center mt-4">
                          <small>
                            <span className="text-muted me-2">
                              Don't have an account ?
                            </span>{" "}
                            <Link to="/signup" className="text-dark fw-bold">
                              Sign Up
                            </Link>
                          </small>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
