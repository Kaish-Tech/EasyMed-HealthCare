package com.qsp.Hospital_Management.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
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
	public ResponseEntity<?> fetchDoctorById(@RequestParam Long doctorId ){
		Doctor doctor = doctorService.fetchDoctorById(doctorId);
		if(doctor!=null) {
			return ResponseEntity.ok(doctor);
		}else {
			return ResponseEntity.status(404).body("Doctor not found with id: "+doctorId);
		}
	}
	@PutMapping("/updateDoctorById")
    public ResponseEntity<?> updateDoctorById(@RequestParam Long oldDoctorId, @RequestBody Doctor updatedDoctor) {
        Doctor doctor = doctorService.updateDoctorById(oldDoctorId, updatedDoctor);
        if (doctor != null) {
            return ResponseEntity.ok(doctor);
        } else {
            return ResponseEntity.status(404).body("Doctor not found with ID: " + oldDoctorId);
        }
    }
	@DeleteMapping("/deleteDoctorById")
    public ResponseEntity<String> deleteDoctorById(@RequestParam Long doctorId) {
        boolean deleted = doctorService.deleteDoctorById(doctorId);
        if (deleted) {
            return ResponseEntity.ok("Doctor deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("Doctor not found with ID: " + doctorId);
        }
    }
	@GetMapping("/filterBySpecialization")
	public List<Doctor> filterBySpecialization(@RequestParam String doctorSpecialization) {
	    return doctorService.filterDoctorsBySpecialization(doctorSpecialization);
	}

	
}
