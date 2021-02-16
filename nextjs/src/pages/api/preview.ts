export default function handler(req, res) {
  const contentType = req.query.content_type;
  const token = req.query.token;

  if (!token || !contentType) {
    res.status(400).json({ message: "Invalid request" });
  }

  res.setPreviewData(
    { contentType, token },
    {
      maxAge: 60 * 60,
    }
  );
  res.redirect(`/preview/${token}/`);
}
