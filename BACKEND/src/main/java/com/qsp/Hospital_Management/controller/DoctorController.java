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

import com.qsp.Hospital_Management.model.Doctor;
import com.qsp.Hospital_Management.service.DoctorService;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

	@Autowired
	private DoctorService doctorService;
	
	@PostMapping("/save")
	public ResponseEntity<Doctor> saveDoctor(@RequestBody Doctor doctor){
		Doctor savedDoctor = doctorService.saveDoctor(doctor);
		return ResponseEntity.ok(savedDoctor);
	}
	
	@GetMapping("/fetchAll")
	public ResponseEntity<List<Doctor>> fetchAllDoctors(){
		List<Doctor> doctors = doctorService.fetchAllDoctors();
		return ResponseEntity.ok(doctors);
	}
	
	@GetMapping("/fetchDoctorById")
	public ResponseEntity<Doctor> fetchDoctorById(@RequestParam Long doctorId ){
		Doctor doctor = doctorService.fetchDoctorById(doctorId);
		if(doctor!=null) {
			return new ResponseEntity<>(doctor,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@PutMapping("/updateDoctorById")
    public ResponseEntity<Doctor> updateDoctorById(@RequestParam Long oldDoctorId, @RequestBody Doctor newDoctor) {
        Doctor updatedDoctor = doctorService.updateDoctorById(oldDoctorId, newDoctor);
        if (updatedDoctor != null) {
            return new ResponseEntity<>(updatedDoctor,HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
	@DeleteMapping("/deleteDoctorById")
    public ResponseEntity<String> deleteDoctorById(@RequestParam Long doctorId) {
        doctorService.deleteDoctorById(doctorId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
	@GetMapping("/filterBySpecialization")
	public List<Doctor> filterBySpecialization(@RequestParam String doctorSpecialization) {
	    return doctorService.filterDoctorsBySpecialization(doctorSpecialization);
	}

	
}
