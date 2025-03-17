import React from "react";
import { Row, Col, Card } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import "../../styles/VideoCards.css";

const videos = [
  {
    id: 1,
    titulo: "Tutorial de React",
    imagen: "https://cdn.pixabay.com/photo/2015/12/03/01/27/play-1073616_1280.png",
    enlace: "https://www.youtube.com/watch?v=dGcsHMXbSOA",
  },
  {
    id: 2,
    titulo: "Introducción a Ant Design",
    imagen: "https://cdn.pixabay.com/photo/2015/12/03/01/27/play-1073616_1280.png",
    enlace: "https://www.youtube.com/watch?v=xyz123",
  },
  {
    id: 3,
    titulo: "Node.js para principiantes",
    imagen: "https://cdn.pixabay.com/photo/2015/12/03/01/27/play-1073616_1280.png",
    enlace: "https://www.youtube.com/watch?v=abcd456",
  },
  {
    id: 4,
    titulo: "Desarrollo Fullstack",
    imagen: "https://cdn.pixabay.com/photo/2015/12/03/01/27/play-1073616_1280.png",
    enlace: "https://www.youtube.com/watch?v=fullstack789",
  },
  {
    id: 5,
    titulo: "Desarrollo Fullstack",
    imagen: "https://cdn.pixabay.com/photo/2015/12/03/01/27/play-1073616_1280.png",
    enlace: "https://www.youtube.com/watch?v=fullstack789",
  },
  {
    id: 6,
    titulo: "Desarrollo Fullstack",
    imagen: "https://cdn.pixabay.com/photo/2015/12/03/01/27/play-1073616_1280.png",
    enlace: "https://www.youtube.com/watch?v=fullstack789",
  },
  {
    id: 7,
    titulo: "Desarrollo Fullstack",
    imagen: "https://cdn.pixabay.com/photo/2015/12/03/01/27/play-1073616_1280.png",
    enlace: "https://www.youtube.com/watch?v=fullstack789",
  },
];

const Videos = () => {
  return (
    <div className="videos-container">
    <h2 className="videos-title">🎥 Videos Recomendados</h2>
    <Row gutter={[16, 16]} justify="center">
      {videos.map(video => (
        <Col xs={24} sm={12} md={12} lg={6} key={video.id}>
          <Card
            hoverable
            className="video-card"
            cover={<img alt={video.titulo} src={video.imagen} className="video-img" />}
            onClick={() => window.open(video.enlace, '_blank')}
          >
            <h3 className="video-title">{video.titulo}</h3>
            <PlayCircleOutlined className="play-icon" />
          </Card>
        </Col>
      ))}
    </Row>
  </div>
  );
};

export default Videos;
