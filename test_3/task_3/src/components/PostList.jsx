import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../redux/post';
import { Table, Pagination } from 'react-bootstrap';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  if (postStatus === 'loading') return <div>Loading...</div>;
  if (postStatus === 'failed') return <div>Error: {error}</div>;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Posts</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, index) => (
            <tr key={post.id}>
              <td>{indexOfFirstPost + index + 1}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        />
        {[...Array(totalPages).keys()].map((page) => (
          <Pagination.Item
            key={page + 1}
            active={page + 1 === currentPage}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
        />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
    </div>
  );
};

export default PostList;
