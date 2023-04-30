import axios from 'axios';

const API_URL = 'https://localhost:4001';

export const listCourses = async (access_token) => {
    try {
        const response = await axios.post(`${API_URL}/courses`, {
            token: access_token
        });
        return response.data.courses;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
}

export const getCourseWork= async (access_token, courseId)=> {
    try {
        const response = await axios.post(`${API_URL}/courses/coursework`, {
            token: access_token,
            courseId: courseId
        });
        return response.data.courseWork;
    } catch (error) {
        console.error('Error fetching course work:', error);
        throw error;
    }
}
 