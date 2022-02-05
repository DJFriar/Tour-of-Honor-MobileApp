import apiClient from "./client";

const endpoint = '/mobile-submission';

const postSubmission = (submission) => {
  const data = new FormData();
  const submittedImages = submission.images;
  console.log("==== submittedImages ====");
  console.log(submittedImages);

  data.append('MemorialID', submission.MemorialID);
  data.append('MemorialCode', submission.MemorialCode);
  data.append('UserID', submission.RiderID);

  if (submittedImages[0]) {
    data.append('images', {
      name: 'primaryImage',
      type: 'image/jpeg',
      uri: submission.images[0]
    })
  }
  if (submittedImages[1]) {
    data.append('images', {
      name: 'optionalImage',
      type: 'image/jpeg',
      uri: submission.images[1]
    })
  }

  console.log("==== submissionAPI data ====");
  console.log(data);

  return apiClient.post(endpoint, data)
}

export default {
  postSubmission
};