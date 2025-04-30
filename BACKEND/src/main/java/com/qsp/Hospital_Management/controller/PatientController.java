package com.qsp.Hospital_Management.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.qsp.Hospital_Management.model.Patient;
import com.qsp.Hospital_Management.service.PatientService;

@RestController
@RequestMapping("api/patients")
public class PatientController {

	@Autowired
	private PatientService patientService;
	
	@PostMapping("/save")
	public ResponseEntity<Patient> savePatient(@RequestBody Patient patient){
		Patient savedPatient=patientService.savePatient(patient);
		return new ResponseEntity<>(savedPatient,HttpStatus.CREATED);
	}
	
	@GetMapping("/fetchAll")
	public ResponseEntity<List<Patient>> fetchAllPatients(){
		List<Patient> patients = patientService.fetchAllPatients();
		return new ResponseEntity<>(patients, HttpStatus.OK);
	}
	@GetMapping("/fetchPatientById")
	public ResponseEntity<Patient> fetchPatientById(@RequestParam Long patientId){
		Patient patient = patientService.fetchPatientById(patientId);
		if(patient!=null) {
			return new ResponseEntity<>(patient, HttpStatus.OK);
			
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/updatePatientById")
	public ResponseEntity<Patient> updatePatientById(@RequestParam Long oldPatientId, @RequestBody Patient newPatient){
		Patient updatedPatient = patientService.updatePatientById(oldPatientId, newPatient);
		if(updatedPatient!=null) {
			return new ResponseEntity<>(updatedPatient, HttpStatus.OK);
			
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@DeleteMapping("/deletePatientById")
    public ResponseEntity<Patient> deletePatientById(@RequestParam Long patientId) {
        patientService.deletePatientById(patientId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
	@GetMapping("/searchByName")
	public List<Patient> searchByName(@RequestParam String patientName) {
	    return patientService.searchPatientsByName(patientName);
	}
	
	@GetMapping("/filterByGender")
	public List<Patient> filterByGender(@RequestParam String patientGender) {
	    return patientService.filterPatientsByGender(patientGender);
	}
}
















