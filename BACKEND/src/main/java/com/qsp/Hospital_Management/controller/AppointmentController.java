package com.qsp.Hospital_Management.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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

import com.qsp.Hospital_Management.model.Appointment;
import com.qsp.Hospital_Management.service.AppointmentService;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

	@Autowired
	private AppointmentService appointmentService;
	
	@PostMapping("/save")
	public ResponseEntity<Appointment> saveAppointment(@RequestBody Appointment appointment) {
		Appointment savedAppointment= appointmentService.saveAppointment(appointment);
		return new ResponseEntity<>(savedAppointment,HttpStatus.CREATED);
	}
	
	@GetMapping("/fetchAll")
	public ResponseEntity<List<Appointment>> fetchAllAppointments(){
		List<Appointment> appointments= appointmentService.fetchAllAppointments();
		return new ResponseEntity<>(appointments,HttpStatus.OK);
	}
	
	@GetMapping("/fetchAppointmentById")
	public ResponseEntity<Appointment> fetchAppointmentById(@RequestParam Long appointmentId) {
		Appointment appointment= appointmentService.fetchAppointmentById(appointmentId);
		if(appointment!=null) {
			return new ResponseEntity<>(appointment,HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/deleteAppointmentById")
    public ResponseEntity<Appointment> deleteAppointmentById(@RequestParam Long appointmentId) {
        appointmentService.deleteAppointmentById(appointmentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Update appointment
    @PutMapping("/updateAppointmentById")
    public ResponseEntity<Appointment> updateAppointmentById(@RequestParam Long oldAppointmentId, @RequestBody Appointment newAppointment) {
    	Appointment updatedAppointment= appointmentService.updateAppointmentById(oldAppointmentId,newAppointment);
    	if(updatedAppointment!=null) {
    		return new ResponseEntity<>(updatedAppointment,HttpStatus.OK);
    	}
    	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/filterAppointmentByDate")
    public List<Appointment> filterAppointmentByDate(
            @RequestParam("appointmentDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate appointmentDate) {
        List<Appointment> appointments = appointmentService.fetchAppointmentsByDate(appointmentDate);
        return appointments;
    }
}













