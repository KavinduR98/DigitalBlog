import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, setCurrentPage } from "../redux/features/blogSlice";
import { useLocation } from "react-router-dom";
import CardReport from "../components/CardBlog";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const { blogs, loading, currentPage, numberOfPages } = useSelector(
    (state) => ({ ...state.blog })
  );
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();

  useEffect(() => {
    dispatch(getBlogs(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1200px",
        alignContent: "center",
        marginTop:"20px"
      }}
    >
      <MDBRow className="mt-5">
        {blogs.length === 0 && location.pathname === "/" && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Articles Found
          </MDBTypography>
        )}

        {blogs.length === 0 && location.pathname !== "/" && (
          <MDBTypography className="text-center mb-0" tag="h2">
            We couldn't find any match for "{searchQuery}"
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {blogs &&
                blogs.map((item) => <CardReport key={item._id} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      {blogs.length > 0 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default Home;
