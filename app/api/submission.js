import apiClient from "./client";

const endpoint = '/submission';

const postSubmission = (submission) => {
  const data = new FormData();
  const submittedImages = submission.images;

  data.append('MemorialID', submission.MemorialID);
  data.append('MemorialCode', submission.MemorialCode);
  data.append('UserID', submission.RiderID);
  data.append('RiderFlag', submission.RiderFlag);
  data.append('RiderNotes', submission.RiderNotes);


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

  console.log("==== Submission ====");
  console.log(data);

  return apiClient.post(endpoint, data)
}

export default {
  postSubmission
};