package com.ibm.student.enrollment.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.collect.HashMultimap;
import com.google.common.collect.SetMultimap;
import com.ibm.student.enrollment.utils.FileParserUtils;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class StudentEnrollmentController {

	JSONArray outputJson = FileParserUtils.createJsonArrayFromPath("output.json");

	@RequestMapping(value = "/unique-subjects", method = RequestMethod.GET, produces = "application/json")
	public Map<String, String> getListofUniqueSubjects() {
		return mapUniqueSubjects(outputJson);
	}

	public static Map<String, String> mapUniqueSubjects(JSONArray studentDetails) {

		Map<String, String> subjectMap = new HashMap<>();
		for (int i = 0; i < studentDetails.size(); i++) {
			JSONObject studentDetail = studentDetails.getJSONObject(i);
			JSONArray classDetails = studentDetail.getJSONArray("class_details");
			if (!classDetails.isEmpty()) {
				for (int j = 0; j < classDetails.size(); j++) {
					String subjectCode = classDetails.getJSONObject(j).getString("subject_code");
					String subjectDesc = classDetails.getJSONObject(j).getString("subject_desc");
					subjectMap.put(subjectCode, subjectDesc);
				}
			}

		}

		return subjectMap;

	}

	@RequestMapping(value = "/list-unique-students", method = RequestMethod.GET, produces = "application/json")
	public String getListofUniqueStudentsBasedOnSubjects(@RequestParam
	final String subjectCode) {
		String studentList = null;
		if(mapUniqueSubjects(outputJson).containsKey(subjectCode)) {
		studentList = mapUniqueSubjectsToStudents(outputJson).get(subjectCode);
		}
		
		return studentList;
	}

	public static Map<String, String> mapUniqueSubjectsToStudents(JSONArray studentDetails) {

		SetMultimap<String, String> subjectToStudentMap = HashMultimap.create();
		Map<String, String> studentListBasedOnSubject = new HashMap<>();

		for (int i = 0; i < studentDetails.size(); i++) {
			String studentID = studentDetails.getJSONObject(i).getString("student_id");
			JSONArray classDetails = studentDetails.getJSONObject(i).getJSONArray("class_details");
			if (!classDetails.isEmpty()) {
				for (int j = 0; j < classDetails.size(); j++) {
					String subjectCode = classDetails.getJSONObject(j).getString("subject_code");
					subjectToStudentMap.put(subjectCode, studentID);
					Set<String> keys = subjectToStudentMap.keySet();

					for (String key : keys) {
						studentListBasedOnSubject.put(key, String.valueOf(subjectToStudentMap.get(key)));

					}

				}
			}

		}
		return studentListBasedOnSubject;

	}
	
}
