import apiClient from "./client";

const endpoint = '/submission';

const getSubmissionDetailsByUser = (id) => apiClient.get(endpoint + '/byUser/' + id);

const postSubmission = (submission) => {
  const data = new FormData();
  const submittedImages = submission.images;

  data.append('MemorialID', submission.MemorialID);
  data.append('MemorialCode', submission.MemorialCode);
  data.append('UserID', submission.RiderID);
  data.append('RiderFlag', submission.RiderFlag);
  data.append('RiderNotes', submission.RiderNotes);
  data.append('OtherRiders', submission.OtherRiders)

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

  return apiClient.post(endpoint, data)
}

export default {
  postSubmission,
  getSubmissionDetailsByUser
};