package com.qsp.Hospital_Management.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
	public Appointment saveAppointment(@RequestBody Appointment appointment) {
		return appointmentService.saveAppointment(appointment);
	}
	
	@GetMapping("/fetchAll")
	public List<Appointment> fetchAllAppointments(){
		return appointmentService.fetchAllAppointments();
	}
	
	@GetMapping("/fetchAppointmentById")
	public Appointment fetchAppointmentById(@RequestParam Long appointmentId) {
		return appointmentService.fetchAppointmentById(appointmentId);
	}
	
	@DeleteMapping("/deleteAppointmentById")
    public String deleteAppointmentById(@RequestParam Long appointmentId) {
        appointmentService.deleteAppointmentById(appointmentId);
        return "Appointment deleted successfully.";
    }

    // Update appointment
    @PutMapping("/updateAppointmentById")
    public Appointment updateAppointmentById(@RequestParam Long oldAppointmentId, @RequestBody Appointment newAppointment) {
        return appointmentService.updateAppointmentById(oldAppointmentId,newAppointment);
    }

    @GetMapping("/filterAppointmentByDate")
    public List<Appointment> filterAppointmentByDate(
            @RequestParam("appointmentDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate appointmentDate) {
        List<Appointment> appointments = appointmentService.fetchAppointmentsByDate(appointmentDate);
        return appointments;
    }
}













